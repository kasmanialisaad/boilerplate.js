const company = config.companyLogo || `
██████╗  ██████╗ ██╗██╗     ███████╗██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗        ██╗███████╗
██╔══██╗██╔═══██╗██║██║     ██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝        ██║██╔════╝
██████╔╝██║   ██║██║██║     █████╗  ██████╔╝██████╔╝██║     ███████║   ██║   █████╗          ██║███████╗
██╔══██╗██║   ██║██║██║     ██╔══╝  ██╔══██╗██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝     ██   ██║╚════██║
██████╔╝╚██████╔╝██║███████╗███████╗██║  ██║██║     ███████╗██║  ██║   ██║   ███████╗██╗╚█████╔╝███████║
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝ ╚════╝ ╚══════╝                          
`;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
var toChange = true;

function SASS() {
    var postcss;
    var mqExtract
    var options = {};
    options.prod = false;
    options.debug = false;
    process.argv.indexOf('--prod') >= 0 ? options.prod = true : options.debug = true;
    var through = $REQUIRE('through2');

    if (process.argv.indexOf('--seperate') >= 0) {

        postcss = $REQUIRE('postcss');

        options.seperate = true;
        options.prod = true;
        options.debug = false;
    } else {
        options.seperate = false;
    }

    var input = path.resolve(config.css.input);

    if (toChange) {
        var result;
        fs.readFile(input, 'utf8', function (err, data) {
            if (err) return console.log(err);

            if (options.prod && data.indexOf('// @import "_dev";') < 0) {
                result = data.replace(/@import "_dev";/g, '// @import "_dev";');
            } else {
                result = data;
            }
            if (options.debug) result = data.replace(/\/\/ @import "_dev";/g, '@import "_dev";');

            fs.writeFile(input, result, 'utf8', function (err) {

                toChange = false;
                SASS();

            });
        });

        return;
    }

    var begin = Date.now();
    console.log('\x1Bc');
    console.log('\x1b[36m%s\x1b[0m', company);

    try {
        if ( config.watch.css.before ) gulp.start('watch:css:before');
    } catch (error) {
        null;
    }

    function message() {

        if (options.prod) {
            console.log('\x1b[33m%s\x1b[0m', 'Compiling Production SASS ' + input);
            console.log('\x1b[32m%s', 'Saved in ' + config.css.output);
            return true;
        }

        if (options.debug) {
            console.log('\x1b[33m%s\x1b[0m', 'Compiling Dev SASS ' + input);
            console.log('\x1b[32m%s', 'Saved in ' + config.css.output);
            return true;
        }
    }

    var gulpSASS = gulp.src(input)
        .pipe(sourcemaps.init())
        .pipe(gulpif(options.debug && message, sass({ outputStyle: 'debug' }).on('error', sass.logError)))
        .pipe(gulpif(options.prod && message, sass({ outputStyle: 'compressed' }).on('error', sass.logError)))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.css.output))
        .pipe(after_gulp());

    console.log('\x1b[37m%s', new Date().toUTCString());

    function after_gulp() {
        return through.obj(() => {
            var end = Date.now();
            var timeSpent = (end - begin) + "ms";
            console.log('\x1b[36m%s\x1b[0m', 'Finished Compile: ' + timeSpent);
            browserSync.reload();

            try {
                if ( config.watch.css.after ) gulp.start('watch:css:after');
            } catch (error) {
                null;
            }
        });
    }   

    require('./mix-manifest').init();

    if(options.seperate) {

        gulpSASS.on('end', function () {

            console.log('Splitting CSS File'.yellow);
            const postcss = $REQUIRE('postcss');
            const splitMq = $REQUIRE('postcss-split-mq');

            const options = {
                outpath: config.css.output,
                files: [
                  {
                    name: 'app-mobile.css',
                    match: [
                        /\(min-width: 0px\) and \(max-width: 639px\)/,
                        /only screen and \(min-width: 400px\)/,
                        /only screen and \(min-width: 480px\)/,
                        /only screen and \(min-width: 560px\)/
                    ]
                  },
                  {
                    name: 'app-tablet.css',
                    match: [
                        /\(min-width: 640px\) and \(max-width: 1247px\)/,
                        /only screen and \(min-width: 640px\)/,
                        /only screen and \(min-width: 768px\)/,
                        /only screen and \(min-width: 1024px\)/
                    ]
                  },
                  {
                    name: 'app-desktop.css',
                    match: [
                        /\(min-width: 1248px\)/,
                        /only screen and (min-width: 1248px)/,
                        /only screen and (min-width: 1440px)/
                    ]
                  },
                ]
              };

            var file = config.css.base.split('.')[0];
            var input = path.resolve(`${config.css.output}${file}.css`);

            fs.readFile(input, (err, data) => {
                if (err) throw err;
                
                postcss([splitMq(options)])
                    .process(data)
                    .then(result => {
                    // result will be a postcss container with the remaining CSS
                    // after striping all media queries that match the `files` option
                    fs.writeFileSync(`${config.css.output}/${file}.css`, result.css)
                    });
              });

              console.log('Finished Seperating CSS Files'.green);
              
              fs.ensureFile(`${config.js.dir}/components/loadAssets().js`, function (){
                    fs.readFile(`${config.js.dir}/components/loadAssets().js`, (err, data) => {
                        data = data.toString();
                        if (data.length === 0) {
                            fs.writeFileSync(`${config.js.dir}/components/loadAssets().js`, `
// Use this component anywhere -> components.loadAssets();

components.loadAssets = function () {

    Defer('css', '${config.css.public || config.css.output}app.css');

    mq('PHONE')   && Defer('css', '${config.css.public || config.css.output}app-mobile.css');
    mq('TABLET')  && Defer('css', '${config.css.public || config.css.output}app-tablet.css');
    mq('DESKTOP') && Defer('css', '${config.css.public || config.css.output}app-desktop.css');

};

onResize(components.loadAssets);`);
                            console.log(`Added ${config.js.dir}/components/loadAssets().js`.green, '(You May Have To Change The CSS Public Path In This File)'.red);
                        }
                    });
              })
        });

    }
}

module.exports = { SASS };