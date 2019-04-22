global.toCamelCase = function (string, ignore) {
    string = string[0] === '/' ? string.substring(1) : string;
    if (string.length === 0) return ignore ? '' : 'home';
    return string.replace(/(-|\_|\s)([a-z])/g, function (g) { return g[1].toUpperCase(); });
};

global.toTitleCase = (string) => {
    string = string[0].toUpperCase() + string.substring(1);
    return string;
};

global.url = function (data) {
    return require('url').parse(data);
};

//global.dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())

/*
    // All Files With Extension: 
    var response = list(location, 'files', 'js');

    // All Files: 
    var response = list(location, 'files');

    // All Folders: 
    var response = list(location, 'dir');

    // All Files and Folders: 
    var response = list(location);
*/

global.list = function (location, type, extension) {

    var all = fs.readdirSync(location)
    var dir = [];
    var files = [];

    if (!type) return all;

    all.forEach(file => {
        var fullPath = path.join(location, file)
        if (fs.statSync(fullPath).isDirectory()) {
            dir.push(file);
        } else {
            files.push(file);
        }
    });

    if (extension) files = files.filter(file => {
        var temp = file;
        var fileSplitted = temp.split('.');
        if (fileSplitted.pop() === extension) {
            return fileSplitted.join('');
        }
    });

    if (type === 'dir') return dir;
    if (type === 'files') return files;

}