var gulp = require('gulp');

function criticalCSS(stylesheet, output, url, width, height) {
    var packageName = 'gulp-penthouse';
    try { var criticalCss = require(packageName); } catch (error) { require('./autoload.js').autoload(packageName); return; }

    console.log('Creating critical.css in ' + output);
    gulp.src(stylesheet)
        .pipe(criticalCss({
            out: 'critical.css',
            url: url,
            width: width,
            height: height,
            strict: true,
            userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }))
        .pipe(gulp.dest(output));
}

module.exports = { criticalCSS };