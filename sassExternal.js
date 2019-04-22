function watch() {
    const watch = require('gulp-watch');
    require('colors');
    var externalLocation = path.resolve(config.css.dir + '/external');
    var watchPath = path.resolve(config.css.dir + '/external/**/*.scss');
    fs.ensureDirSync(externalLocation);

    watch(watchPath, browserSync.reload).on('change', function (file) {
        fileParsed = path.parse(file);
        var split = fileParsed.dir.split(/[\/|\\]/);
        var folder = split.pop();
        var glob;
        var output;
        
        if (folder === 'external') {
            glob = file;
            output = fileParsed.name + '.css';
        } else {
            glob = path.resolve(fileParsed.dir + '/app.scss')
            output = folder + '.css';
        }

        
        setTimeout(() => {
            console.log('Compiling External SASS Compnent...'.yellow);
            compile(glob, output);
        }, 500);

    });

}

function compile(input, fileName) {
    require('colors');
    const sass = require('gulp-sass');
    const autoprefixer = require('gulp-autoprefixer');
    const sourcemaps = require('gulp-sourcemaps');
    const gulpif = require('gulp-if');
    const concat = require('gulp-concat');
    var outputLocation = path.resolve(config.css.output + 'external/');
    fs.ensureDirSync(outputLocation);

     gulp.src(input)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat(fileName))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(outputLocation));

    console.log(`Compiled ${path.resolve(`${outputLocation}/${fileName}`)}`.green);
    console.log('');
    console.log(`
/* How To Use

    External.css('${fileName.split('.')[0]}', function() {

        console.log('External CSS Loaded!');

    });

    or 
    
    External.css('${fileName.split('.')[0]}');



*/
    `.grey);
}

module.exports = { watch };