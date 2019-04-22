function init(change) {
    console.log('\x1Bc');
    console.log('');

    var questions = [{
        type: 'list',
        name: 'value',
        message: 'Config Paths\n',
        choices: [
                new inquirer.Separator(),
                { value:'back', name: 'Home'.grey },
                { value:'autoupdate', name: 'Auto Update  '.grey + (config.autoUpdate ? 'ON'.green : 'OFF'.red) },
                new inquirer.Separator(),
                { value:'js', name: '1) JavaScript' },
                { value:'css', name: '2) SASS' },
                { value:'server', name: '3) Server ' },
                { value:'images', name: '4) Images' },
                { value:'sprites', name: '5) Sprites' },
                { value:'webfonts', name: '6) Webfonts' },
        ],
    }];

    if (change) {

        questions[0].choices = change;

    } else {

        questions[0].choices.forEach(obj => {

            if (obj.value === 'server') {
                var sync = fs.readFileSync(config.browsersync).toString();
                if (sync.length > 0) {
                    obj.name = obj.name.green + '   ' + sync;
                } else {
                    obj.name = obj.name.red
                }
                return;
            }

            if (obj.value) {
                var found = config[obj.value] ? true : false;
                obj.name = obj.name[found ? 'green' : 'red'];
                if (found && typeof config[obj.value] === 'string') obj.name = obj.name + '   ' + config[obj.value];
            }
        });

    }

    inquirer.prompt(questions).then(answers => {

        if (answers.value === 'back') return require('./app').start();

        if (answers.value.indexOf('js') >= 0) {
            if (answers.value === 'js') return nested(null, null, 'js');
            return nested(true, answers.value, 'js');
        }
        if (answers.value.indexOf('css') >= 0) {
            if (answers.value === 'css') return nested(null, null, 'css');
            return nested(true, answers.value, 'css');
        }

        if (answers.value === 'autoupdate') {
            config.autoUpdate = !config.autoUpdate;
            config.update();
            init();
            return;
        }

        if (answers.value === 'server') {
            console.log('server');
            var file = path.resolve('./config.browsersync.txt');
            fs.ensureFileSync(file);
            var data = fs.readFileSync(file).toString();
            console.log(data);
            ask.input('Enter New Path', response => {
                fs.writeFileSync(file, response);
                init();
            }, data || 'localhost:8080');
            return;
        }
        

        config.check(answers.value, (result) => {
            result && change();
            result || init();
            
        });

        function change(value) {
            ask.input('Enter New Path', response => {
                config[answers.value] = response;
                config.update();
                init();
            }, config[answers.value]);
        }

        function nested(done, value, type) {
            if (done) {
                var suggestion;
                switch (value) {

                    case `${type}.input` : suggestion = `./Boilerplate/src/${type === 'css' ? 'sass' : type}/app.${type === 'css' ? 'scss' : type}`; break;
                    case `${type}.output`: suggestion = `./public/${type}/`; break;
                    case `${type}.public`: var public = true; suggestion = `/${type}/`; break;
                
                    default: break;
                }
                try {
                    var alt = config[value[0]][value[1]];
                } catch (error) {
                    var alt = '';
                }
                value = value.split('.');
                ask.input('Enter New Path', response => {
                    config[value[0]] || (config[value[0]] = {});
                    config[value[0]][value[1]] = response;
                    if (public) {
                        var content = fs.readFileSync(config.js.init).toString();
                        
                        if (type === 'js') content = content.replace(/window\.PublicPathJS\s*?=\s*?['"](.*)['"];/gmi, `window.PublicPathJS = '${response}';`);
                        if (type === 'css') content = content.replace(/window\.PublicPathCSS\s*?=\s*?['"](.*)['"];/gmi, `window.PublicPathCSS = '${response}';`);
                        fs.writeFileSync(config.js.init, content);
                        console.log(`Updated: ${config.js.init}`.grey);
                    }
                    config.update();
                    init();
                }, alt || suggestion)
            } else {
                var change = [
                    { value:'back', name: '..'.grey },
                    { value:`${type}.input`, name: 'Input' },
                    { value:`${type}.output`, name: 'Output' },
                    { value:`${type}.public`, name: 'Public' },
                ];

                change.forEach(obj => {
                    if (obj.value === 'back') return;
                    var value = obj.value.split('.');
                    var found
                    try {
                        found = config[value[0]][value[1]] ? true : false;
                        if (found) obj.name = obj.name + '   ' + config[value[0]][value[1]];
                    } catch (error) {
                        found = false;
                    }
                    obj.name = obj.name[found ? 'green' : 'red'];

                });

                init(change);
            }

        }

    });
}

module.exports = { init };