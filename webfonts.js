const child = require('child_process');

function webfonts() {


       var dir = path.resolve(config.css.dir + '/webfonts');
        fs.ensureDirSync(dir);
    
        var command = `
            
                "./node_modules/.bin/icon-font-generator"
                "${config.webfonts}/**/*.svg"
                -o "${dir}"
                --html true
                --json false
            `;
    
        command = command.split('\n').join('').trim().replace(/\s+/g, " ");
        // console.log(command);
        child.exec(command, function(err, stdout) {
            if (err) return console.log(err);
            
            fs.removeSync(path.resolve(dir + '/icons.scss'));
            fs.ensureFileSync(path.resolve(dir + '/icons.css'));
            fs.move(path.resolve(dir + '/icons.css'), path.resolve(dir + '/icons.scss'), err => {
                if (err) return console.error(err)
              
                console.log('success!')
                Prepend.sass('_cli.scss', '@import "webfonts/icons";');

                fs.copy(path.resolve(dir + '/icons.woff2'), path.resolve(config.css.output + '/icons.woff2'), err => {
                    if (err) return console.error(err)
                });
                fs.copy(path.resolve(dir + '/icons.woff'), path.resolve(config.css.output + '/icons.woff'), err => {
                    if (err) return console.error(err)
                });
                fs.copy(path.resolve(dir + '/icons.ttf'), path.resolve(config.css.output + '/icons.ttf'), err => {
                    if (err) return console.error(err)
                });
                fs.copy(path.resolve(dir + '/icons.eot'), path.resolve(config.css.output + '/icons.eot'), err => {
                    if (err) return console.error(err)
                });
                fs.copy(path.resolve(dir + '/icons.svg'), path.resolve(config.css.output + '/icons.svg'), err => {
                    if (err) return console.error(err)
                });

                browserSync.reload();
                setTimeout(() => {
                    console.log(stdout);
                }, 250);
            });
            
        });   
}

watcher.webfonts = () => {

    fs.ensureDirSync(config.webfonts);
    watch((config.webfonts + '/**/*.svg'), function () {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log("Creating Webfonts, Please Wait...");
            webfonts();
        }, 250);

    });
    
}

module.exports = {
    webfonts
};