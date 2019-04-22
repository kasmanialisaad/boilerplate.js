function minify(url) {

    var html_minifier = $REQUIRE('html-minifier');
    var curl = $REQUIRE('curl');

    url.map(function (url) {
        setTimeout(() => {
            url = check(url);
            var content;
            var result;
            var filename;
            curl.get(url, '', function (err, response, body) {
                result = html_minifier(body, {
                    removeAttributeQuotes: true,
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    removeScriptTypeAttributes: true
                });

                url = (url.split('/').pop()).split('?')[0];

                filename = (url.length === 0) ? 'index.html' : url.split('/').pop() + '.html';

                !fs.existsSync('Minified') && fs.mkdirSync('Minified');

                fs.writeFile('Minified/' + filename, result, (err) => {
                    if (err) throw err;
                    console.log(filename + ' Saved! Minified -- ' + formatBytes(fs.statSync('Minified/' + filename).size));
                });
            });

        }, 1);
    });
    
}

function original(url) {
    var locationInfo;
    url.map(function (url) {
        setTimeout(() => {
            url = check(url);
            curl.get(url, '', function (err, response, body) {

                url = (url.split('/').pop()).split('?')[0];

                !fs.existsSync('Original') && fs.mkdirSync('Original');

                fs.writeFile('Original/' + url.split('/').pop() + '.html', body, (err) => {
                    if (err) throw err;
                    console.log(url.split('/').pop() + '.html Saved! Original -- ' + formatBytes(fs.statSync('Original/' + url.split('/').pop() + '.html').size));
                    return './Original/' + url.split('/').pop() + '.html';
                });
            });

        }, 1);
    });
}

function download(url, done) {
    var html_minifier = $REQUIRE('html-minifier');
    var curl = $REQUIRE('curl');

    url = check(url);
    var location;
    curl.get(url, '', function (err, response, body) {

        url = (url.split('/').pop()).split('?')[0];

        !fs.existsSync('temp') && fs.mkdirSync('temp');

        fs.writeFile('temp/' + url.split('/').pop() + '.html', body, (err) => {
            if (err) throw err;
            console.log(url.split('/').pop() + '.html Saved! temp -- ' + formatBytes(fs.statSync('temp/' + url.split('/').pop() + '.html').size));
            done('./temp/' + url.split('/').pop() + '.html');
        });
    });
}

function formatBytes(bytes, decimals) {
    if (0 == bytes) return "0 Bytes";
    var c = 1024,
        d = decimals || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(bytes) / Math.log(c));
    return parseFloat((bytes / Math.pow(c, f)).toFixed(d)) + " " + e[f];
}

function check(url) {
    return (url.indexOf('http') < 0) ? 'http://' + url : url;
}

module.exports = {
    minify,
    original,
    download
};