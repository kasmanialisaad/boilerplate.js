/* How To Use

    function LoadAssets() {

                         Defer('css', '/public/css/app.min.css');
        mq('PHONE')   && Defer('css', '/public/css/mobile.min.css');
        mq('TABLET')  && Defer('css', '/public/css/tablet.min.css');
        mq('DESKTOP') && Defer('css', '/public/css/desktop.min.css');
    
    }

    onResize(LoadAssets);

*/

function onResize(cb, time = 500, id = 'default') {

    cb();

    window.addEventListener('resize', function () {

        buffer(cb, time, id);

    });
}
