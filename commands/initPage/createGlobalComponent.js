function createGlobalComponent(param) {

    var globalComponentBase = param.slice(1, param.length);

    // Doesn't create global but creates a folder with sub components
    if (globalComponentBase.split('~').length > 1) {
        createGlobalSubComponent(globalComponentBase.split('~'));
        return;
    }

    var globalComponent = path.resolve(config.js.dir + '/components/' + globalComponentBase + '.js');
    if (process.argv.indexOf('--external') >= 0) {
        globalComponent = path.resolve(config.js.dir + '/external/' + globalComponentBase + '.js')
    }

    fs.ensureFile(globalComponent, err => {
        console.log('Created', globalComponent);
        if (fs.readFileSync(globalComponent).toString().length === 0) {
            fs.appendFileSync(globalComponent, `// Use this component anywhere -> components.${globalComponentBase}();

components.${globalComponentBase} = function () {
    // Your Code Here
};
                `);
        }
    });

}

function createGlobalSubComponent(params) {
    var globalFolder = params[0];
    var globalSubComponent = path.resolve(config.js.dir + '/components/' + globalFolder + '/' + params[1] + '.js');
    if (process.argv.indexOf('--external') >= 0) {
        globalSubComponent = path.resolve(config.js.dir + '/external/' + globalFolder + '/' + params[1] + '.js');
    }
    fs.ensureFile(globalSubComponent, err => {
        
        console.log('Created', globalSubComponent);
        if (fs.readFileSync(globalSubComponent).toString().length === 0) {
            fs.appendFileSync(globalSubComponent, `// Use this component anywhere -> components.${globalFolder}.${params[1]}();

components.${globalFolder}.${params[1]} = function () {
    // Your Code Here
};
                `);
        };
        if ( (fs.readFileSync(config.js.init).toString()).indexOf(`components.${globalFolder}`) < 0 ) {
            fs.appendFileSync(config.js.init, `\r\ncomponents.${globalFolder} = {};`);
            console.log('Updated init.js');
        }
        
    });
}

module.exports = {
    createGlobalComponent
};