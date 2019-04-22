// Gets Value Of A URL Parameter

/* How To Use (if current URL is https://examplesite.com/download?filetype=pdf&name=testfile)

    var filetype = getParameterByName('filetype');
    var filename = getParameterByName('name');

    console.log(filetype); // 'pdf'
    console.log(filename); // 'testfile'

    --Or provide your own url--

    var filetype = getParameterByName('filetype', 'https://examplesite.com/download?filetype=pdf&name=testfile');
    var filename = getParameterByName('name', 'https://examplesite.com/download?filetype=pdf&name=testfile');

    console.log(filetype); // 'pdf'
    console.log(filename); // 'testfile'

*/

function getParameterByName(name, url) {
    url = url || window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);

}

function checkParameterByName(key, value, url) {
    url = url || window.location.href;
    try {
        var result = getParameterByName(key.toLowerCase(), url);
        if (value.toLowerCase() === result.toLowerCase()) return true;
    } catch (error) {
        return false;
    }
}

function setParameterByName(key, value, uri) {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
    uri = uri || location.href;
    if (value === undefined) {
        if (uri.match(re)) {
            window.history.replaceState({}, null, uri.replace(re, '$1$2'));
            return uri.replace(re, '$1$2');
        } else {
            window.history.replaceState({}, null, uri);
            return uri;
        }
    } else {
        if (uri.match(re)) {
            window.history.replaceState({}, null, uri.replace(re, '$1' + key + "=" + value + '$2'));
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            var hash = '';
            if (uri.indexOf('#') !== -1) {
                hash = uri.replace(/.*#/, '#');
                uri = uri.replace(/#.*/, '');
            }
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            window.history.replaceState({}, null, uri + separator + key + "=" + value + hash);
            return uri + separator + key + "=" + value + hash;
        }
    }
}