// Use this component anywhere -> components.loadAssets();

components.loadAssets = function () {

    Defer('css', '/public/css/app.css');

    mq('PHONE')   && Defer('css', '/public/css/app-mobile.css');
    mq('TABLET')  && Defer('css', '/public/css/app-tablet.css');
    mq('DESKTOP') && Defer('css', '/public/css/app-desktop.css');

};

onResize(components.loadAssets);