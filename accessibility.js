const gulp = require('gulp');
const { download } = require('./html-minifier');

function accessibility(location, level, reportLevels) {

    var access = $REQUIRE('gulp-accessibility');

    if (isURL(location)) {
        download(location, function (data) {
            execute(data);
        });
    } else {
        execute(location);
    }

    function execute(location) {
    
    console.log(location);
    gulp.src(location)
        .pipe(access({
            force: false,
            accessibilityLevel: level,
            reportLevels: reportLevels
        }))
        .on('error', console.log);
    }

}

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

module.exports = {
    accessibility
};