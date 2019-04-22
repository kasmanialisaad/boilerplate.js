const child = require('child_process');


function autoload(packageName, callback) {

        console.log('\x1b[41m%s\x1b[0m', packageName + ' was not found.');
        console.log('\x1b[36m%s\x1b[0m',`Installing ${ packageName } Please Wait...This May Take Few Minutes`);
        execSync(`cd node_modules/boilerplate.js && npm install ${packageName} --save`);
        console.log('\033c');
        console.log('\x1b[41m%s\x1b[0m', packageName + ' was not found.');
        console.log('\x1b[36m%s\x1b[0m', `Installing ${packageName} Please Wait...This May Take Few Minutes`);
        console.log('\x1b[42m%s\x1b[0m', 'Installation Complete!');
        console.log(' ');
        console.log('Please run the command again');
        return;
}

function REQUIRE(package, callback, options) {
    if (!options) options = {};
    try {
        var test = require(package);
        callback(require(package));
    } catch (error) {
        var command = `${options.user ? '' : 'cd node_modules/boilerplate.js &&' } npm install ${package} ${options.global ? '-g' : '--save'}`;
        console.log('\x1b[41m%s\x1b[0m', package + ' was not found.');
        console.log('\x1b[36m%s\x1b[0m', `Installing ${package} Please Wait...`);
        child.exec(command, function () {
            console.log('\x1b[42m%s\x1b[0m', 'Installation Complete!');
            
            callback(require(package));
          
        });
    }
}

module.exports = { autoload, REQUIRE };


// var packageName = 'gulp-cache-bust';
// require('./autoload.js').autoload(packageName, function () {
//     setTimeout(() => {
//         var test = require(packageName);
//         console.log(test);
//     }, 300);
// });


function template(params) {

    var packageName = 'gulp-cache-bust';

    require('./autoload.js').autoload(packageName, function () {

        var spritesmith = require(packageName);

    });
}

function $REQUIRE (package, options) {
    if (!options) options = {};

    try {
        
        return require(package);

    } catch (error) {
        var command = `${options.user ? '' : 'cd node_modules/boilerplate.js &&' } npm install ${package} ${options.global ? '-g' : '--save-dev'}`;
        console.log('\x1b[41m%s\x1b[0m', package + ' was not found.');
        console.log('\x1b[36m%s\x1b[0m', `Installing ${package} Please Wait...`);
        child.execSync(command);
        console.log('\x1b[42m%s\x1b[0m', 'Installation Complete!');
        return require(package);               
    }
}

global.$REQUIRE = $REQUIRE;
