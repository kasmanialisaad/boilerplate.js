// Set Variables In Config.js

const boiler   = require('boilerplate.js');
try { require('./config.boilerplate.js'); } catch (error) { }

// @Command: "gulp start"
gulp.task('start', () => { setTimeout(boiler.start, 0); });

// @Command: "gulp jigsaw" (Install Jigsaw)
// @Command: "gulp" (run)
boiler.gulp.task('jigsaw', () => { return boiler.jigsaw(); });

// @Command: "gulp sass" or "gulp sass --prod"
boiler.gulp.task('sass', () => boiler.SASS());

// @Command: "gulp js" or "gulp js --prod"
boiler.gulp.task('js', () => boiler.JS());

// @Command: "gulp prod" for executing both "gulp js --prod" & "gulp sass --prod"
boiler.gulp.task('prod', () => { process.argv += ' --prod'; boiler.JS(); boiler.SASS(); });

// @Command: "gulp watch"
boiler.gulp.task('watch', () => { boiler.gulp.start('sass'); boiler.gulp.start('js'); boiler.WATCH(); });

// @Command: "gulp" (same as "gulp start")
boiler.gulp.task('default', () => process.argv.length > 2 ? boiler.commands(process.argv, config) : boiler.gulp.start('start'));

// @Command: "gulp image"
boiler.gulp.task('image', () => boiler.image());

// @Command: "gulp sitespeed"
boiler.gulp.task('sitespeed', () => sitespeed());

// @Command: "gulp minify" (dest: location + '/Minified')
boiler.gulp.task('minify', function () {
    boiler.minify([
        'https://google.com',
        'cnn.com',
        'https://twitter.com/about'
    ]);
});

// @Command: "gulp access"
boiler.gulp.task('access', function () {

    // Enter URL or path to .html file
    var url = 'https://www.couchsurfing.com/';

    // WCAG2A, WCAG2AA, WCAG2AAA, and Section508
    var accessibilityLevel = 'WCAG2AA';

    var reportLevels = {
        notice: false,
        warning: true,
        error: true
    }

    boiler.accessibility(url, accessibilityLevel, reportLevels);
});

// @Command: "gulp stress"
boiler.gulp.task('stress', function () {

    var url = 'https://www.example.com';
    var concurrent = 10;
    var requestsPerSecond = 5;
    var maxSeconds = 30;

    boiler.stressTest(url, concurrent, requestsPerSecond, maxSeconds);
});

// @Command: "gulp critical"
boiler.gulp.task('critical', function () {

    var stylesheet = './public/css/app.css';
    var output = './public/css/'; //critical.css
    var url = 'https://example.com';
    var width = 1300;
    var height = 900;

    boiler.criticalCSS(stylesheet, output, url, width, height);
});

// @Command: "gulp sprites"
boiler.gulp.task('sprites', function () {

    var input = './src/images/*.png';
    var output = './src/images/output/';

    boiler.sprites(input, output);
});

boiler.gulp.task('test', () => test());

// @Command: "gulp copy"
boiler.gulp.task('copy', () => { require('child_process').exec('npm run postinstall --prefix node_modules/boilerplate.js', (err, stdout, stderr) => console.log(stdout)); });
