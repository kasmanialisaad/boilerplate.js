// Asynchronous Load CSS/JS Files/Libraries

/* How To Use

    // Load CSS
    Defer.css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    
    Defer.css('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css', function (){
        console.log('Bootstrap Loaded!');
    });

    // Load JS
    Defer.js('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js');

    Defer.js('https://code.jquery.com/jquery-3.3.1.min.js', function (){
        console.log('jQuery Loaded!');
    });

    -or-

    // Load CSS
    Defer('css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

    Defer('css', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css', function (){
        console.log('Bootstrap Loaded!');
    });

    // Load JS
    Defer('js', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js');

    Defer('js', 'https://code.jquery.com/jquery-3.3.1.min.js', function (){
        console.log('jQuery Loaded!');
    });


*/
function Defer(type, src, callback) {

    if (type === 'js') {
        var test = document.querySelector('script[src="' + src + '"]');

        if (test) {

            callback && callback();
            return;

        } else {

            var a = document.createElement("script");

            a.src = src;
            a.async = true;
            a.type = "text/javascript";
            a.onload = callback;

            document.getElementsByTagName('head')[0].appendChild(a);
        }

    }

    if (type === 'css') {
        var test = document.querySelector('link[href="' + src + '"]');

        if (test) {

            callback && callback();
            return;

        } else {

            var a = document.createElement("link");

            a.href = src;
            a.async = true;
            a.rel = "stylesheet";
            a.property = 'stylesheet';
            a.type = 'text/css';
            a.onload = callback;

            document.getElementsByTagName('head')[0].appendChild(a);
        }


    }

    if (type === 'images') {

        let attribute;

        mq('PHONE') && (attribute = 'src-mobile');
        mq('TABLET') && (attribute = 'src-tablet');
        mq('DESKTOP') && (attribute = 'src-desktop');

        attribute && [...document.querySelectorAll(`img[${attribute}]`)].forEach(img => {
            img.src = img.getAttribute(attribute);
            img.removeAttribute(attribute);
            img.onload = () => {
                img.parentElement.removeAttribute('style');
                img.parentElement.className = img.parentElement.className.replace('placeholder', '').trim();
            };
        });

        [...document.querySelectorAll(`img[src-all]`)].forEach(img => {
            img.src = img.getAttribute('src-all');
            img.removeAttribute('src-all');
            img.onload = () => {
                img.parentElement.removeAttribute('style');
                img.parentElement.className = img.parentElement.className.replace('placeholder', '').trim();
            };
        });

        callback && callback();
        return;

    }

}

Defer.css = (src, callback) => Defer('css', src, callback);
Defer.js = (src, callback) => Defer('js', src, callback);
Defer.images = (callback) => Defer('images', null, callback);