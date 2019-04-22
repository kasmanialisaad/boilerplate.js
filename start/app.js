const company = config.companyLogo || `
██████╗  ██████╗ ██╗██╗     ███████╗██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗        ██╗███████╗
██╔══██╗██╔═══██╗██║██║     ██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝        ██║██╔════╝
██████╔╝██║   ██║██║██║     █████╗  ██████╔╝██████╔╝██║     ███████║   ██║   █████╗          ██║███████╗
██╔══██╗██║   ██║██║██║     ██╔══╝  ██╔══██╗██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝     ██   ██║╚════██║
██████╔╝╚██████╔╝██║███████╗███████╗██║  ██║██║     ███████╗██║  ██║   ██║   ███████╗██╗╚█████╔╝███████║
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝ ╚════╝ ╚══════╝                         
`;
require('colors');
require('./exit');
require('./helpers');

function start() {
    console.log('\x1Bc');
    console.log('\x1b[36m%s\x1b[0m', company);

    var questions = [{
            type: 'list',
            name: 'start',
            message: 'What do you want to do?\n',
            pageSize: process.argv.indexOf('--long') >= 0 ? 50 : '',
            choices: [
                new inquirer.Separator(),
                    { value:'watch', name: 'Start Watcher'.green },
                    { value:'config', name: 'Config'.grey },
                    { value:'exit', name: 'Exit'.red },
                new inquirer.Separator(),
                    { value:'dev', name: '1) Compile JavaScript & SASS Developemnt' },
                    { value:'prod', name: '2) Compile JavaScript & SASS Production' },
                    { value:'jsComponent', name: '3) Create JavaScript Component' },
                    { value:'sassComponent', name: '4) Create SASS Component' },
                    { value:'sassSeperate', name: '5) Seperate SASS' + ' (Base|Mobile|Tablet|Desktop)'.grey },
                    { value:'jigsaw', name: '6) Install Jigsaw' + ' (Requires Composer)'.grey },
                    { value:'sitespeed', name: '7) Webpage Speed Test' + ' (Sitespeed.io)'.grey },
                    { value:'loadtest', name: '8) Webpage Stress Test' },
                    { value:'image', name: '9) Lossless Image Compression' },
                    { value:'webfont', name: '10) Webfont Generator' },
                    { value:'sprites', name: '11) Image Sprites Generator' },

            ],
        }
    ];

    inquirer.prompt(questions).then(answers => {
        global.hck2 = require('boilerplate.js');
            require('../../../gulpfile');

            // console.log(JSON.stringify(answers, null, 4));

            switch (answers.start) {
                case 'watch': hck2.gulp.start('watch'); break;
                case 'image': hck2.gulp.start('image'); break;
                case 'dev': hck2.JS(); hck2.SASS(); break;
                case 'prod': process.argv += ' --prod'; hck2.JS(); hck2.SASS(); break;
                case 'jigsaw': hck2.jigsaw(); break;
                case 'sitespeed': require('./sitespeed'); break;
                case 'loadtest': require('./loadtest'); break;
                case 'jsComponent': require('./jsComponent').init(); break;
                case 'sassComponent': require('./sassComponent').init(); break;
                case 'webfont': require('./webfont').init(); break;
                case 'sprites': require('./sprites').init(); break;
                case 'config': require('./config').init(); break;
                case 'exit': exit(); break;
                case 'sassSeperate': process.argv += ' --seperate'; hck2.SASS(); break;
            
                default: console.log('Error'.red); break;
            }
    });

}

module.exports = { start };