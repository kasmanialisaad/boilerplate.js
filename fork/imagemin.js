const gulp = require('gulp');
const config = require('../../../config.json');
const imagemin = require('gulp-imagemin');
const path = require('path');

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