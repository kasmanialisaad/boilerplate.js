function createPageComponent(param) {
    var pathCC = (toCamelCase(param[0]));

    if (param.length > 2) { createPageSubComponent(param); return; }

    var filePath = path.resolve(config.js.dir + `/page/${pathCC}/${param[1]}.js`);
   
    fs.createFile(filePath, err => {
        if (!err) {
            

            if (fs.readFileSync(filePath).toString().length === 0) {
                fs.appendFileSync(filePath, `// How To Use -> ${pathCC.split('/').join('.')}.components.${param[1]}();
        
${pathCC.split('/').join('.')}.components.${param[1]} = function() {
    // Your Code Here
};
                `);
            console.log('Created: ' + filePath);
            } else {
                console.log('Already Exists: ' + filePath);
            }
        }
    });
}

function createPageSubComponent(param) {
    var pathCC = (toCamelCase(param[0]));
    var folder = param[1];
    var fileName = param[2];
    var filePath = path.resolve(config.js.dir + `/page/${pathCC}/${folder}/${fileName}.js`);

    fs.createFile(filePath, err => {
        if (!err) {


            if (fs.readFileSync(filePath).toString().length === 0) {
                fs.appendFileSync(filePath, `// How To Use -> ${pathCC.split('/').join('.')}.components.${folder}.${fileName}();
        
${pathCC.split('/').join('.')}.components.${folder}.${fileName} = function() {
    // Your Code Here
};
                `);
                console.log('Created: ' + filePath);
                fs.readFile(config.js.init, function (err, data) {
                    data.indexOf(`${pathCC.split('/').join('.')}.components.${folder} = {};`) < 0 ? fs.appendFileSync(config.js.init, `\r\n${pathCC.split('/').join('.')}.components.${folder} = {};`) : console.log('Object Already Exists In init.js');;
                });
                
                console.log('Adding Component To init.js');
            } else {
                console.log('Already Exists: ' + filePath);
            }
        }
    });
}



module.exports = { createPageComponent };