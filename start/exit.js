global.exit = function () {
    console.log('');
    var question = [{
        type: 'list',
        name: 'exit',
        message: 'Exit?\n',
        choices: [
                { value:'yes', name: 'Yes' },
                { value:'no', name: 'No' },
        ],
    }];

    inquirer.prompt(question).then(answers => {

        answers.exit === 'yes' ? process.exit() : require('./app').start();

    });
};