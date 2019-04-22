const fs = require('fs-extra');
const path = require('path');
var options = false;
try {var options = require('../../config.js').options;} catch(err) {}
const version = require('./package.json').version;
require('colors');

// Renames .eslintrc.json to .eslintrc.json.backup to prevent gulp-eslint interference 
fs.rename('../../.eslintrc.json', '../../.eslintrc.json.backup', (err) => {
    if(err) { return; } 
    console.log('Renaming .eslintrc.json -> .eslintrc.json.backup');
});

if (options && options.autoUpdate) {
    console.log('Auto Update Enabled!');
    console.log('Updating Boilerplate src Files from boilerplate.js v' + version);
    var BoilerplateJS = path.parse(options.js.input);
    var BoilerplateSASS = path.parse(options.sass.input);
    fs.exists('../.' + BoilerplateJS.dir, (exists) => {
        if (exists) {
            fs.copy('./Boilerplate/src/js/dev', '../.' + BoilerplateJS.dir + '/dev', err => {
                if (err) return console.error(err);
                console.log('Autoupdate: Overwriting '.magenta + BoilerplateJS.dir.magenta  + '/dev'.magenta);
            });
            fs.copy('./Boilerplate/src/js/helpers', '../.' + BoilerplateJS.dir + '/helpers', err => {
                if (err) return console.error(err);
                console.log('Autoupdate: Overwriting '.magenta  + BoilerplateJS.dir.magenta  + '/helpers'.magenta);
            });
            return;
        }   
    });
}

fs.exists('../../gulpfile.js', (exists) => {
    if (exists) {
        fs.copy('./gulpfile.js', '../../gulpfile.js', err => {
            if (err) return console.error(err);
            console.log('Overwriting gulpfile.js'.yellow);
        });
        return;
    } 

    fs.copy('./gulpfile.js', '../../gulpfile.js', err => {
        if (err) return console.error(err);
        console.log('Added gulpfile.js'.green);
    });
});

// fs.exists('../../config.js', (exists) => {
//     if (exists) return console.log('Skipping "config.js". File Already Exists'.grey);

//     fs.copy('./config.js', '../../config.js', err => {
//         if (err) return console.error(err);
//         console.log('Added config.js'.green);
//     });
// });

fs.exists('../../config.json', (exists) => {
    if (exists) return console.log('Skipping "config.json". File Already Exists'.grey);

    fs.copy('./config.json', '../../config.json', err => {
        if (err) return console.error(err);
        console.log('Added config.json'.green);
    });
});

fs.exists('../../eslint.json', (exists) => {
    if (exists) return console.log('Skipping "eslint.json". File Already Exists'.grey);

    fs.copy('./eslint.json', '../../eslint.json', err => {
        if (err) return console.error(err);
        console.log('Added eslint.json'.green);
    });
});

fs.exists('../../.gitignore', (exists) => {
    if (exists) return console.log('Skipping ".gitignore". File Already Exists'.grey);

    fs.copy('./gitignore', '../../.gitignore', err => {
        if (err) return console.error(err);
        console.log('Added .gitignore'.green);
    });
});
    
fs.exists('../../Boilerplate', (exists) => {
    if (exists) {
        fs.copy('./Boilerplate', '../../Boilerplate', err => {
            if (err) return console.error(err);
            console.log('Overwriting /Boilerplate'.yellow);
        });
        return;
    } 

    fs.copy('./Boilerplate', '../../Boilerplate', err => {
        if (err) return console.error(err);
        console.log('Added /Boilerplate'.green);
    });
});
