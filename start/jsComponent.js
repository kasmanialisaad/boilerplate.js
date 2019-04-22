function init(clear) {
   
    console.log('');
    clear && console.log('\x1Bc');
    var question = [{
        type: 'list',
        name: 'start',
        message: 'What Type Of Component?\n',
        choices: [
                { value:'back', name: 'Home'.grey },
                new inquirer.Separator(),
                { value:'page', name: 'Page Specific Component' },
                { value:'global', name: 'Global Component' },
                { value:'external', name: 'External Component' },
        ],
    }];

    inquirer.prompt(question).then(answers => {

        if (answers.start === 'back') return require('./app').start();

        switch (answers.start) {
            case 'page': pageComponent(); break;
            case 'global': globalComponent(); break;
            case 'external': globalComponent('--external'); break;
            default: break;
        }

    });
}

function globalComponent(external, page) {

    external = external || '';
    page = page || '';
    var dir = [];

    try {
        fs.ensureDirSync(config.js.dir + '/external');
        dir = list(config.js.dir + (external ? '/external' : '/components'), 'dir');
        if (page) {
            var tempPath = path.resolve(config.js.dir + '/page/' + toCamelCase(page));
            dir = list(tempPath, 'dir');
        }
    } catch (error) {
        dir = ['No Components Found'];
    }


    var skip = false;
    var alt;

    inquirer.registerPrompt('suggest', $REQUIRE('inquirer-prompt-suggest'));
    console.log(dir.join(' | ').grey);
    console.log('');
    var question = [{
        type: 'suggest',
        name: 'name',
        message: 'Enter Component Name   ' + 'Leave Blank To Create Single File Component\n'.grey,
        suggestions: dir,
    }];
    
    inquirer.prompt(question).then(answers => {
        answers.name = toCamelCase(answers.name, true);
        var command = `gulp --js ${external ? '' : page}~${answers.name}`;
        if (!answers.name.trim()) { skip = true; alt = 'Create Single File Component?' };
        dir.map(x => x === answers.name ? skip = true : null);
        skip || console.log(`Alias: "${command}~init ${external}"`.grey);
        skip || console.log( ((child.execSync(command + `~init ${external}`)).toString()).green );

        ask.confirm(alt || 'Create Sub Component?', yes => globalSubComponent(command, alt, external, page), no => exit());
    });

}

function globalSubComponent(command, singleFile, external, page) {
    var message = 'Enter Sub-Component Name';
    if (singleFile) message = 'Enter Single File Component Name';
    ask.input(message, response => {

        if (singleFile) {
            console.log(`Alias: "gulp --js ${external ? '' : page}~${response} ${external}"`.grey)
            console.log( ((child.execSync(`gulp --js ${external ? '' : page}~${response} ${external}`)).toString()).green );
        } else {
            console.log(`Alias: "${command}~${response} ${external}"`.grey);
            console.log( ((child.execSync(command + `~${response} ${external}`)).toString()).green );
        }
        ask.confirm('Add Another Component?', yes => init(true), no => exit());
    });
    
}

function pageComponent() {
    console.log('');
    var question = [{
        type: 'input',
        name: 'url',
        message: 'Enter Page URL   ' + 'Example: "http://example.com/about/careers" or "/about/careers"\n'.grey,
    }];
    
    inquirer.prompt(question).then(answers => {
        console.log(`Alias: "gulp --js ${answers.url}"`.grey);
        globalComponent(null, answers.url);
    });

}

module.exports = { init };
