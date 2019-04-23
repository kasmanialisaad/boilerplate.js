////////////////// IMPORTS ////////////////////////
global.gulp = require('gulp');
global.path = require('path');
global.prepend = require('prepend');
global.watch = require('gulp-watch');
global.browserSync = require('browser-sync');
global.watcher = {};
global.REQUIRE = require('./autoload').REQUIRE;
global.fs = require('fs-extra');
global.colors = require('colors');
global.child = require('child_process');
global.config = require('../../config.json');
require('./helpers/import.js');
require('./sitespeed.js');
const jigsaw = require('./jigsaw').init;
const start = require('./start/app.js').start;
const { minify, original } = require('./html-minifier');
const { SASS, SASS_PROD } = require('./sass');
const { JS, JS_PROD } = require('./javascript');
const { accessibility } = require('./accessibility');
const { stressTest } = require('./loadtest');
const { image } = require('./imagemin');
const { criticalCSS } = require('./criticalcss');
const sprites = require('./sprites');
const { commands } = require('./commands');
const { webfonts } = require('./webfonts');

//////////////// ./IMPORTS ////////////////////////
function WATCH() {


    watch((config.css.dir + '/**/*.scss'), function () {
        SASS(config.css.input, config.css.output);
    });

    watch((config.js.dir + '/**/*.js'), function () {
        JS(config.js.input, config.js.output);
    });

    require('./jsExternal').watch();
    require('./sassExternal').watch();

    if (config.laravel) {
        config.laravelViews = config.laravelViews || './resources/views/**/*.blade.php';
        watch((config.laravelViews), browserSync.reload).on('change', function (file) {
            try { require('../../config.laravel').init(file); } catch (error) { null; }
        });
    }

    if (config.images) {
        setTimeout(() => {
            console.log(`Optimizing Images (${path.resolve(config.images)})`.magenta);
            child.fork('./node_modules/boilerplate.js/fork/imagemin.js');
        }, 3000);
    }

    setTimeout(() => {
        config.sprites && sprites.watchSprites(config);
    }, 2000);
    

    if (config.jigsaw) {

        watch('./source/**/*.blade.php').on('change', function(file) {
            var begin = Date.now();
            file = path.parse(file);
            file.dir = file.dir.split('source')[1];
            let dir = file.dir.indexOf('/') >= 0 ? file.dir.split('/') : file.dir.split('\\');
            let publicPath = dir.join('/') + '/index.html';
           
            child.exec('mv "./build_local/assets" "./assets"', () => {});
            child.exec('"./vendor/bin/jigsaw" build', function() {
                child.execSync('mv "./assets" "./build_local/assets"');
                browserSync.reload();
                var end = Date.now();
                var timeSpent = (end - begin) + "ms";
                console.log('Jigsaw Build Complete'.bgBlue.white, timeSpent);
                // require('./jigsaw').initFile('./build_local' + publicPath);
            });
        });

        browserSync.init({
            server: {
                baseDir: "./build_local"
            }
        });

    }

    if (config.webfonts) {

        fs.ensureDirSync(config.webfonts);
        watch((config.webfonts + '/**/*.svg'), function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                console.log("Creating Webfonts, Please Wait...");
                webfonts();
            }, 250);

        });
    }

    if (config.browsersync) {
        console.log('\x1b[36m%s\x1b[0m', 'watching ' + path.resolve(config.css.dir + '/**/*.scss'));
        console.log('\x1b[36m%s\x1b[0m', 'watching ' + path.resolve(config.js.dir + '/**/*.js'));
        browserSync.init({
            open: 'external',
            proxy: {
                target: fs.readFileSync(config.browsersync).toString(),
                ws: true // enables websockets for crossbrowser sync
            }
        });
    }

}

global.test = () => {
    console.log('\x1Bc');
    require('./mix-manifest').init();
}

module.exports = {
    SASS,
    WATCH,
    minify,
    original,
    SASS_PROD,
    gulp,
    JS,
    JS_PROD,
    accessibility,
    stressTest,
    image,
    criticalCSS,
    commands,
    jigsaw,
    test,
    start
};