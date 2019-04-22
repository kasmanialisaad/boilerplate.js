// Executes page init fuction based on the URL. Example: if URL = "example.com/about-us" It will execute function named "page.aboutUs();"
window.addEventListener("load", function (event) {
    ready();
    initPage();
    measure('stop', 'App.js Bootstrap');
});

function initPage(url) {
    log('%cThis Is A Development Environment, Please Run "gulp js --prod"', 'background: purple; color: #fff; font-weight: bold; font-size: 1.3em; padding: 12px;');
    var link = document.createElement('a');

    try {
        link.href = url || init.url;
    } catch (error) {
        link.href = url || location.pathname;
    }

    if (link.pathname.indexOf('.') >= 0) {
        var splitPath = link.pathname.split('.');
        splitPath.pop();
        url = splitPath.join('.');
    } else {
        url = link.pathname;
    }

    var urlSplit = (toCamelCase(url)).split('/');
    if (!urlSplit[urlSplit.length - 1]) urlSplit.pop();
    var toExecute = [];
    var messageOnce = false;

    urlSplit.forEach(x => {
        toExecute.push(x);
        try {

            try {
                var checkFunction = eval('page.' + toExecute.join('.'));
            } catch (error) {
                throw (error);
            }


            if (checkFunction) {
                checkFunction();
                log('%cpage.' + toExecute.join('.') + ' Found!', 'background: green; color: #fff; padding: 10px;');
            } else {
                if (!messageOnce) {
                    log('%cgulp --initPage ' + link.href, 'background: grey; color: #fff; padding: 10px;');
                    messageOnce = true;
                }
                log('%cFunction page.' + toExecute.join('.') + ' Not Found!', 'background: red; color: #fff; padding: 10px;');

            }
        } catch (error) { null; }
    });
}

function thisPageOnly(pathname, cb) {
    try {
        if (init.url === pathname) cb();
    } catch (error) {
        if (location.pathname === pathname) cb();
    }
}



