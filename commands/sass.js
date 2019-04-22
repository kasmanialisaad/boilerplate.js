function sass(param, sassLocation, config) {

    require('colors');
    var bootstrap = sassLocation + '/_cli.scss';

    // Create Global Component
    if (param[0] === '~') {
        var globalComponent;
        if (process.argv.indexOf('--external') >= 0) {
            globalComponent = path.resolve(sassLocation + '/external/' + param.split('~')[1] + '.scss');
            console.log('Creating External Component...'.green);
        } else {
            globalComponent = path.resolve(sassLocation + '/components/' + param.split('~')[1] + '.scss');
            console.log('Creating Global Component...'.green);
        }

        fs.ensureFile(globalComponent, err => {
            console.log('Created: '.green + globalComponent.gray);
        });
        fs.readFile(bootstrap, function (err, data) {
            if (err) throw err;
            if (process.argv.indexOf('--external') >= 0) {
                fs.appendFileSync(globalComponent, '@import "../mixins/mixins"; \r\n')
            } else {
                var importText = '@import "components/' + param.split('~')[1] + '";';
                console.log('Updating _cli.scss'.gray);
                (data.indexOf(importText) < 0) ? fs.appendFileSync(bootstrap, '\r\n' + importText) : '';
            }
        });
        return;
    }

    var component = param.split('~')[1];
    var pathname = url(param.split('~')[0]).pathname;
    if (pathname.indexOf('.') >= 0) {
        var splitPath = pathname.split('.');
        splitPath.pop();
        pathname = splitPath.join('.');
    }
    var arrayCC = (toCamelCase(pathname)).split('/');
    var pathnameCC = arrayCC.join('/');
    var arrayOriginal = pathname.split('/');
    arrayOriginal = arrayOriginal.slice(1, arrayOriginal.length);
    var toCheck = [];
    
    var bodyID = pathname.length === 1 ? 'home' : (((pathname.split('.')[0]).slice(1)).split('/')).join('-');

    // append data to file
    fs.readFile(bootstrap, function (err, data) {
        if (err) throw err;

        console.log('Updating _cli.scss');
        (data.indexOf('@import "layout/page/' + pathnameCC + '/page.scss";') < 0) ? fs.appendFileSync(bootstrap, '\r\n@import "layout/page/' + pathnameCC + '/page.scss";') : '';
        
        var file = path.resolve(sassLocation + '/layout/page/' + pathnameCC + '/page.scss');
        
        fs.ensureFile(file, err => {
            // console.log(err) // => null
            console.log('Created: ' + file);

            if (fs.readFileSync(file).toString().length === 0) {
                fs.appendFileSync(file, `.${bodyID}-${config.company || 'boilerplate'} {

}
                `);
            }

            if (component) {
                var componentFile = path.resolve((path.parse(file).dir + '/_' + component + '.scss'));
                console.log(componentFile);
                fs.ensureFile(componentFile, err => {
                    if (fs.readFileSync(componentFile).toString().length === 0) {
                        if (fs.readFileSync(file).toString().indexOf(`@import "_${component}";\n`) < 0) {
                            prepend(file, `@import "_${component}";\n`, function (error) {
                                if (error)
                                console.error(error.message);
                            });
                        }    
                        fs.appendFileSync(componentFile, `.${bodyID}-${config.company || 'boilerplate'} {

}
                        `);
                    }
                });
            }
             

        });
        
        return;
    });
}

function url(data) {
    return require('url').parse(data);
}

function toCamelCase(string) {
    string = string[0] === '/' ? string.substring(1) : string;
    if (string.length === 0) return 'home';
    return string.replace(/(-|\_)([a-zA-Z])/g, function (g) { return g[1].toUpperCase(); });
}

module.exports = { sass };