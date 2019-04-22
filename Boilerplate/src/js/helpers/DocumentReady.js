// IE8+
// Same as jQuery's "$(document).ready(function(){ console.log('hello world'); });"

/* How To Use

    DocumentReady(function() {
        console.log('hello world');
    });

*/

function DocumentReady(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState !== 'loading') { fn(); } 
        });
    }
}