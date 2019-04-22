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
                { value:'external', name: 'External Component' + ' Not Complete'.gray },
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
        fs.ensureDirSync(config.js.dir + '/components');
        fs.ensureDirSync(config.js.dir + '/external');
        dir = list(config.css.dir + (external ? '/external' : '/components'), 'dir');
        if (page) {
            var tempPath = path.resolve(config.css.dir + '/layout/page/' + page);
            dir = list(tempPath, 'dir');
        }
    } catch (error) {
        dir = ['No Components Found'];
    }


    var skip = false;
    var alt;

    inquirer.registerPrompt('suggest', $REQUIRE('inquirer-prompt-suggest'));
    console.log(dir.join('\n').grey);
    console.log('');
    var question = [{
        type: 'suggest',
        name: 'name',
        message: 'Enter Component Name\n',
        suggestions: dir,
    }];
    
    inquirer.prompt(question).then(answers => {
        answers.name = toCamelCase(answers.name, true);
        var command = `gulp --sass ${external ? '' : page}~${answers.name}`;
        if (!answers.name.trim()) { skip = true; alt = 'Create Single File Component?' };
        dir.map(x => x === answers.name ? skip = true : null);
        skip || console.log(`Alias: "${command} ${external}"`.grey);
        skip || console.log( ((child.execSync(command + ` ${external}`)).toString()).green );

        exit()
        // ask.confirm(alt || 'Create Sub Component?', yes => globalSubComponent(command, alt, external, page), no => exit());
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
        answers.url = answers.url;
        console.log(`Alias: "gulp --sass ${answers.url}"`.grey);
        globalComponent(null, answers.url);
    });

}

module.exports = { init };