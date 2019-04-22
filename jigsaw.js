var child = require('child_process');

function init(option, cb) {

    // if (option.build) {

    //     return child.exec('composer exec jigsaw build', function (err, stdout, stderr) {
    //         console.log('Jigsaw Build Complete'.blue);
    //         cb();
    //     });
    // }

    install(function () {
        console.log('Successfully Installed Jigsaw!'.green);
        child.exec('composer exec jigsaw init', function (err, stdout, stderr) {
        
            if (err) return console.log('Jigsaw May Already Be Initialized'.red);
            if (stderr) return console.log('Jigsaw May Already Be Initialized'.red);

            console.log('Jigsaw Initialized!'.yellow);

            setTimeout(copyFiles, 3000);
           
        });
    });
}

function install(cb) {

    child.exec('composer -V', function (err, data, stderr) {
        console.log('\x1Bc');
        if (stderr) return console.log('Composer Not Found. Please Install Composer Globally'.bgRed.red);
        console.log('Composer Found! Installing Jigsaw. Please Wait...'.green);

        child.exec('composer require tightenco/jigsaw', function (err, stdout, stderr) {
            // if (stderr) return console.log(stderr);
            if (err) return console.log(err);
            cb();
        });

    });

}

function copyFiles() {

    fs.remove('./source', function (err) {
        if (err) return console.log(err);

        fs.copy('./node_modules/boilerplate.js/jigsaw/source', './source', err => {
            if (err) return console.error(err);
            console.log('Copying Source Folder'.yellow);
            console.log('Copying Boilerplate Files'.yellow);
            fs.copySync('./node_modules/boilerplate.js/Boilerplate/src/js', './source/_assets/js')
            fs.copySync('./node_modules/boilerplate.js/Boilerplate/src/sass', './source/_assets/sass')
        });

        fs.copy('./node_modules/boilerplate.js/jigsaw/config.json', './config.json', err => {
            if (err) return console.error(err);
            console.log('Updated config.json'.yellow);
        });

        fs.copy('./node_modules/boilerplate.js/jigsaw/blade.php', './blade.php', err => {
            if (err) return console.error(err);
            console.log('Updated blade.php'.yellow);
        });

        fs.removeSync('./webpack.mix.js');
        fs.removeSync('./Boilerplate');
    });

}

function initFile(file) {

    file = fs.readFileSync(file).toString();
    console.log(file);
    return;

    fs.readFile(file, function (err, data) {
        return console.log(data);
        if (err) return console.log(file.red, 'not found'.red);
        var fileName = file.indexOf('/') >= 0 ? file.split('/') : file.split('\\');
        fileName = fileName[fileName.length - 1];
        data = data.toString();
        var url = /@section\('url',\s?'(.*)'\)/.exec(data);
        if (!url) {
            try {
                var index = file.split(/\/|\\/);
                index.pop();
                file = path.resolve(index.join('/') + '/index.blade.php');
                var data = fs.readFileSync(file).toString();
                url = /@section\('url',\s?'(.*)'\)/.exec(data);
                if (!url) return console.log(fileName.yellow, 'not cached'.red);
            } catch (error) {
                return console.log(fileName.yellow, 'not cached'.red);
            }
        }

        minifyCB(file, function (data) {
            if (data.indexOf('<script>window.init') !== 0) return console.log(fileName.yellow, 'Error!'.red);
            fs.ensureFileSync(config.cache);
            var cache = fs.readFileSync(config.cache);
            cache = JSON.parse(cache.toString());
            cache[url[1]] = data;
            cache.id++;
            cache.id = cache.id.toString();
            fs.writeFileSync(config.cache, JSON.stringify(cache, null, 4));
            console.log(fileName.yellow, 'cached'.green)
            console.log(config.cache.grey, 'Updated!'.grey)
        });
    });
}

function minifyCB(file, cb) {

    var html_minifier = $REQUIRE('html-minifier');
    var curl = $REQUIRE('curl');
    file = path.resolve(file);
    file = file.split(/[\/\\]/);
    file.splice(0, file.indexOf('views') + 1);
    file = file.join('.');
    file = file.replace('.blade.php', '');

    var url = 'http://' + config.server + '/static/test?ajax=1';

    curl.get(url, { headers: { data: file } }, function (err, response, body) {

        result = html_minifier.minify(body, {
            removeAttributeQuotes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeScriptTypeAttributes: true
        });

        cb(result);
    });

}

module.exports = {
    init,
    initFile
};