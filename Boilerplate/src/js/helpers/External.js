/* How To Use

    External.js('componentName', function(){
        components.componentName.init();
    });

    External.css('widget', function() {
        console.log('css loaded!');
    });

    or

    External.css('widget');

*/

function External(type, path, cb, publicPath) {
    publicPath = publicPath[publicPath.length-1] === '/' ? publicPath.slice(0, publicPath.length-1) : publicPath;
    var file = publicPath + '/external/' + path;
    var file = file.indexOf('.' + type) >= 0 ? '' : file += '.' + type;
    Defer(type, file, () => cb ? cb() : null);

}

External.js = (path, cb) => External('js', path, cb, PublicPathJS);
External.css = (path, cb) => External('css', path, cb, PublicPathCSS);