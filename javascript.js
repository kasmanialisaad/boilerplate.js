const company = config.companyLogo || `
██████╗  ██████╗ ██╗██╗     ███████╗██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗        ██╗███████╗
██╔══██╗██╔═══██╗██║██║     ██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝        ██║██╔════╝
██████╔╝██║   ██║██║██║     █████╗  ██████╔╝██████╔╝██║     ███████║   ██║   █████╗          ██║███████╗
██╔══██╗██║   ██║██║██║     ██╔══╝  ██╔══██╗██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝     ██   ██║╚════██║
██████╔╝╚██████╔╝██║███████╗███████╗██║  ██║██║     ███████╗██║  ██║   ██║   ███████╗██╗╚█████╔╝███████║
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝ ╚════╝ ╚══════╝                          
`;
const gulp = require('gulp');
const lint = require('../../eslint.json');
const babel = require('gulp-babel');
const minify = require("gulp-babel-minify");
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const concat = require("gulp-concat");
const gulpif = require('gulp-if');

function JS() {
    var options = {};
    process.argv.indexOf('--prod') >= 0 ? options.prod = true : options.prod = false;
    process.argv.indexOf('--seperate') >= 0 ? options.seperate = true : options.seperate = false;
    var through = $REQUIRE('through2');

    var input = path.resolve(config.js.input);
    var inputFileName = path.parse(input).base;

    var begin = Date.now();

    var jsLocation = path.parse(input).dir;
    var bootstrap = jsLocation + '/bootstrap.js';
    var all = jsLocation + '/**/*.js';
    var jsPORD = '!' + path.resolve(jsLocation + '/dev/**/*.js');
    var jsExternal = '!' + path.resolve(jsLocation + '/external/**/*.js');

    console.log('\x1Bc');
    console.log('\x1b[36m%s\x1b[0m', company);

    function message() {

        if (options.prod) {
            console.log('\x1b[33m%s\x1b[0m', 'Compiling Production Javascript ' + input);
            console.log('\x1b[32m%s', 'Saved in ' + config.js.output + config.js.base);
            return true;
        }

        console.log('\x1b[33m%s\x1b[0m', 'Compiling Dev Javascript ' + input);
        console.log('\x1b[32m%s', 'Saved in ' + config.js.output + config.js.base);
        return false;
    }

    try {
        if ( config.watch.js.before ) gulp.start('watch:js:before');
    } catch (error) {
        null;
    }

    gulp.src([bootstrap, input, all, jsExternal, (options.prod ? jsPORD : '')])
        .pipe(eslint(lint))
        .pipe(eslint.format())
        .pipe(concat(inputFileName))
        .pipe(gulpif(!options.prod, sourcemaps.init()))
        .pipe(babel({
            "presets": [
                ["env", {
                    "targets": {
                        "browsers": ["last 2 versions", "safari >= 7"]
                    }
                }]
            ]
        }))
        .pipe(gulpif(message, minify()))
        .pipe(gulpif(!options.prod, sourcemaps.write('./')))
        .pipe(gulp.dest(config.js.output))
        .pipe(after_gulp());
    console.log('\x1b[37m%s', new Date().toUTCString());

    function after_gulp() {
        return through.obj(() => {
            var end = Date.now();
            var timeSpent = (end - begin) + "ms";
            console.log('\x1b[36m%s\x1b[0m', 'Finished Compile: ' + timeSpent);
            browserSync.reload();
            try {
                if ( config.watch.js.after ) gulp.start('watch:js:after');
            } catch (error) {
                null;
            }
        });
    }

    require('./mix-manifest').init();
}

module.exports = { JS };