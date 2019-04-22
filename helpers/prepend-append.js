global.Prepend = {};
global.Append = {};

Prepend.sass = function (file, content, cb, options) {
    if (!options) options = {};
    file = path.resolve(config.css.dir + '/' + file);
    if (options.duplicate || fs.readFileSync(file).toString().indexOf(content) < 0) {
        prepend(file, content, function(error) {
            if (error) return console.error(error.message);
            if (cb) cb(); return;
        });
    } 
};

Prepend.js = function (file, content, cb, options) {
    if (!options) options = {};
    file = path.resolve(config.js.dir + '/' + file);
    if (options.duplicate || fs.readFileSync(file).toString().indexOf(content) < 0) {
        prepend(file, content, function(error) {
            if (error) return console.error(error.message);
            if (cb) cb(); return;
        });
    } 
};

Append.sass = function (file, content, cb, options) {
    if (!options) options = {};
    file = path.resolve(config.css.dir + '/' + file);
    if (options.duplicate || fs.readFileSync(file).toString().indexOf(content) < 0) {
        fs.appendFileSync(file, '\n' + content);
        if (cb) cb(); return;
    } 
};

Append.js = function (file, content, cb, options) {
    if (!options) options = {};
    file = path.resolve(config.js.dir + '/' + file);
    if (options.duplicate || fs.readFileSync(file).toString().indexOf(content) < 0) {
        fs.appendFileSync(file, '\n' + content);
        if (cb) cb(); return;
    } 
};