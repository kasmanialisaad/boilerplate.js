function initPage(param, jsLocation) {

    var pathname = url(param).pathname;
    var createComponent = false;
    var sendToComponent = pathname.split('~');

    if (pathname.split('~').length > 1) {
        createComponent = true;
        pathname = pathname.split('~')[0];
    };

    var arrayCC = (toCamelCase(pathname)).split('/');
    var arrayOriginal = pathname.split('/');
    arrayOriginal = arrayOriginal.slice(1, arrayOriginal.length);
    var toCheck = [];

    if (param[0] === '~') {
        require('./initPage/createGlobalComponent').createGlobalComponent(param);
        return;
    }

    !fs.existsSync(jsLocation + '/page') && fs.mkdirSync(jsLocation + '/page');

    // append data to file
    fs.readFile(config.js.init, function (err, data) {
        if (err) throw err;

        console.log('Updating init.js');
        (data.indexOf('function ' + arrayCC[0]) < 0) ? fs.appendFileSync(config.js.init, '\r\nfunction ' + arrayCC[0] + '() {}'): '';

        arrayCC.map((x, index) => {
            if (!x) return;
            toCheck.push((x));
            var FilePath = jsLocation + '/page/' + toCheck.join('/');
            var initFile = path.resolve(FilePath + '/_init.js');

            if (data.indexOf('page.' + toCheck.join('.')) < 0) {
                fs.appendFileSync(config.js.init, '\r\npage.' + toCheck.join('.') + ' = {}; ');
                toCheck.join('.') !== arrayCC[0] ? fs.appendFileSync(config.js.init, toCheck.join('.') + ' = {}; ') : '';
                fs.appendFileSync(config.js.init, toCheck.join('.') + '.components = {};');
            }

            !fs.existsSync(FilePath) && fs.mkdirSync(FilePath);
            if (!fs.existsSync(initFile)) {
                fs.writeFileSync(initFile, template(toCheck, index + 1, arrayOriginal));
                console.log('Created: ', initFile);
            } else {
                console.log('File Already Exists', initFile);
            }
        });


    });

    if (createComponent) require('./initPage/createPageComponent').createPageComponent(sendToComponent);

    function template(data, index, pathname) {
        pathname = pathname.slice(0, index);
        return `page.${data.join('.')} = function() {
    // Code here also executes in all subpages

    // Executes on this page only
    thisPageOnly('/${pathname.join('/')}', function () {
        // Your Code Here
    });
};`;
    }

    function templateComponent(data) {
        return `// How To Use -> ${data.join('.')}.components.exampleComponent();
        
${data.join('.')}.components.exampleComponent = function() {
    // Example component for this page
};

`
    }
}

module.exports = {
    initPage
};