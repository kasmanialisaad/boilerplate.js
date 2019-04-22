console.log('');

var questions = [
    {
      type: 'input',
      name: 'url',
      message: 'Enter Full Website URL' + '   Example: "https://www.example.com"\n'.grey
    },
    {
      type: 'input',
      name: 'concurrent',
      message: "Number Of Concurrent Requests?",
      default: function() {
        return 10;
      }
    },{
      type: 'input',
      name: 'requestsPerSecond',
      message: "Requests Per Second?",
      default: function() {
        return 5;
      }
    },
    {
      type: 'input',
      name: 'maxSeconds',
      message: "Number Of Seconds?",
      default: function() {
        return 30;
      }
    }
  ];

  inquirer.prompt(questions).then(answers => {
    hck2.stressTest(answers.url, answers.concurrent, answers.requestsPerSecond, answers.maxSeconds);
});