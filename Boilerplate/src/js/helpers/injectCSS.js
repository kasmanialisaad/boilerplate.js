/* How To Use

    var css = `
        .test-debug::before {
            content: "Test";
            position: fixed;
            font-weight: bold;
            font-size: 20px
            background-color: white;
            color: red;
            bottom: 0;
            left: 50%;
        }`;

    injectCSS(css);

*/

function injectCSS(css) {
    var element = document.createElement('style');
    element.setAttribute('type', 'text/css');

    if ('textContent' in element) {
        element.textContent = css;
    } else {
        element.styleSheet.cssText = css;
    }

    document.getElementsByTagName('head')[0].appendChild(element);
}
