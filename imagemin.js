const imagemin = require('gulp-imagemin');

function image() {

    gulp.src(path.resolve(config.images + '/**/*'))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ],{ verbose: true }))
    .pipe(gulp.dest(path.resolve(config.images)));
 
}

module.exports = { image };

