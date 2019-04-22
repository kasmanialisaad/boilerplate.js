console.log('');

var question = [{
    type: 'input',
    name: 'url',
    message: 'Enter Full Website URL' + '   Example: "https://www.example.com"\n'.grey,
}];

inquirer.prompt(question).then(answers => {
    process.argv[3] = '--' + answers.url;
    sitespeed();
});

