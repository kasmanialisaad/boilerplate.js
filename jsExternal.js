function watch() {
    const watch = require('gulp-watch');

    var externalLocation = path.resolve(config.js.dir + '/external');
    var watchPath = path.resolve(config.js.dir + '/external/**/*.js');
    fs.ensureDirSync(externalLocation);

    watch(watchPath, browserSync.reload).on('change', function (file) {
        fileParsed = path.parse(file);
        var split = fileParsed.dir.split(/[\/|\\]/);
        var folder = fileParsed.dir.split(/[\/|\\]/).pop();
        var glob;
        var output;

        if (folder === 'external') {
            glob = file;
            output = fileParsed.base;
        } else {
            folder = split[split.indexOf('external') + 1];
            
            console.log(folder);
            glob = path.resolve(fileParsed.dir.split(folder)[0] + '/**/*.js')
            output = folder + '.js';
        }

        
        setTimeout(() => {
            console.log('Compiling External JS Compnent...'.yellow);
            compile(glob, output);
        }, 500);

    });

}

function compile(input, fileName) {
    const eslint = require('gulp-eslint');
    const lint = require('../../eslint.json');
    const minify = require("gulp-babel-minify");
    const concat = require("gulp-concat");
    const babel = require('gulp-babel');
    var outputLocation = path.resolve(config.js.output + 'external/');
    fs.ensureDirSync(outputLocation);

    gulp.src([input])
    .pipe(eslint(lint))
    .pipe(eslint.format())
    .pipe(concat(fileName))
    .pipe(babel({
        "presets": [
            ["env", {
                "targets": {
                    "browsers": ["last 2 versions", "safari >= 7"]
                }
            }]
        ]
    }))
    .pipe(minify())
    .pipe(gulp.dest(outputLocation));

    console.log(`Compiled ${path.resolve(`${outputLocation}/${fileName}`)}`.green);
    console.log('');
    console.log(`
/* How To Use

    External.js('${fileName.split('.')[0]}', function() {

        console.log('Component Loaded!');

    });

*/
    `.grey);
}

module.exports = { watch };