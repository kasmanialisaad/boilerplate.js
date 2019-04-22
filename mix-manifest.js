function init() {
    if (config.laravel || config.laravelMix) {
        config.laravelMix = config.laravelMix || './public/mix-manifest.json';

        fs.readFile(config.laravelMix, function (err, data) {
            if (err) return create();
            update(data);
        });

    }
}

function create() {
    console.log(`mix-manifest.json file not found (${config.laravelMix})`.red)
    console.log(`Creating mix-manifest.json (${config.laravelMix})`.yellow);
    let js = config.js.public + '/' + config.js.base;
    let css = config.css.public + '/' + config.css.base.replace('scss', 'css');
    let data = {};
    data[js] = js + '?id=0';
    data[css] = css + '?id=0';
    fs.writeJsonSync(config.laravelMix, data);
}

function update(data) {
    data = JSON.parse( data.toString() );

    Object.entries(data).forEach(value => {
        let split = value[1].split('=');
        let id = parseInt(split[1]);
        id++;
        data[ value[0] ] = split[0] + '=' + id;
    });

    fs.writeJsonSync(config.laravelMix, data);
    console.log(`Updated mix-manifest.json (${config.laravelMix})`.gray);
}

module.exports = { init };