var glob = require('glob')
global.inquirer = require('inquirer');

glob.sync('./node_modules/boilerplate.js/helpers/**/*.js').forEach(function (file) {
    require(path.resolve(file));
});