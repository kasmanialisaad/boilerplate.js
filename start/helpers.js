global.ask = {};


/*
    ask.input('What Is Your Name?', response => {
        
        console.log(response);
        
    });
*/

ask.input = (message, cb, defaultValue) => {
    console.log('');
    var question = [{
        type: 'input',
        name: 'input',
        message: message + '\n',
        validate: value => value.trim() ? true : 'Invalid Input',
        default: () => defaultValue ? defaultValue : null 
    }];
    
    inquirer.prompt(question).then(answers => {
        cb(answers.input);
    });
};

/*
    ask.confirm('You Good?', yes => {

        console.log('yes')

    }, no => {

        console.log('no')

    });
*/

ask.confirm = (message, yes, no) => {
    console.log('');
    var question = [{
        type: 'list',
        name: 'start',
        message: message + '\n',
        choices: [
            { value:'yes', name: 'Yes' },
            { value:'no', name: 'No' },
        ],
    }];

    inquirer.prompt(question).then(bool => bool.start === 'yes' ? (yes && yes()) : (no && no()));
};