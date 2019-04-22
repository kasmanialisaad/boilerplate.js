

function sprites(input, fileName) {

    const fs = require('fs-extra');
    const imagemin = require('gulp-imagemin');
    var spritesmith = $REQUIRE('gulp.spritesmith');
    var output = path.resolve(config.css.dir + '/sprites/');
    var cssFilePath = path.resolve(`${output}/${fileName}`);
    
    fs.ensureDirSync(output);
    // console.log(input);
    // console.log(output);

    var spriteData = gulp.src(input)
        .pipe(spritesmith({ imgName: `${fileName}.png`, cssName: `${fileName}.css` }))
        .pipe( gulp.dest(output) );

                  
    spriteData.on('end', () => {

        fs.renameSync( `${cssFilePath}.css`,`${cssFilePath}.scss` );

        console.log('Updating _cli.scss...');
        Prepend.sass('_cli.scss', `@import "sprites/${fileName}.scss";`);
        var cssFile = (fs.readFileSync(cssFilePath + '.scss')).toString();
        
        var cssFileData = cssFile.replace(/icon-/g, `${fileName}-`);
        cssFileData = cssFileData.replace(new RegExp(`${fileName}.png`, 'g'), `sprites/${fileName}.png`);
        
        fs.writeFileSync(`${cssFilePath}.scss`, cssFileData);
        
        var compressImage = gulp.src( path.resolve(`${output}/${fileName}.png`) )
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
        .pipe(gulp.dest( output ));

        compressImage.on('end', () => {
            var dest = path.resolve(`${config.css.output}/sprites`);
            fs.ensureDirSync(dest);
            fs.copyFileSync(cssFilePath + '.png', `${dest}/${fileName}.png`);
            console.log(`Generated ${cssFilePath}.scss`.grey);
            console.log(`Moved ${fileName}.png to public folder`.grey);
        });

    });

}

function watchSprites(config) {

    require('colors');

    var current = path.resolve(config.sprites);
    var glob = path.resolve(config.sprites + '/**/*');
    console.log('Watching '.cyan + config.sprites.cyan);

    watch((glob), null).on('add', (file) => {
        console.log(`Added ${file}`.grey);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(run, 1000, {
            'file': file,
            'add': true
        });
    }).on('unlink', (file) => {
        console.log(`Removed ${file}`.grey);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(run, 1000, {
            'file': file,
            'add': false
        });
    });

    function run(data) {
            console.log('Generating Sprites...'.green);
            var dir = path.parse(data.file).dir;
            var fileName = (dir.split(/[\/\\]+/)).pop();
            sprites(path.resolve(dir + '/*'), toCamelCase(fileName.toLowerCase()));
    }

}

module.exports = { sprites, watchSprites };
