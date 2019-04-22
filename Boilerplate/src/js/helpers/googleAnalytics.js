/* How To Use

    googleAnalytics('send', 'pageview');

*/

function googleAnalytics() {

    var args = [...arguments];

    !dev && Defer.js('https://www.google-analytics.com/analytics.js', function () {
        window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments); }; ga.l = + new Date;
        ga('create', 'UA-xxxxxxx-x', 'auto');
        ga(...args);
    });

}  