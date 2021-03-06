// Set Dev Mode
window.dev = false;

// Change to false for debugging
window.clearConsole = true;

// Headers for httpRequest
httpRequest.requestHeaders = [{
    'request': 'X-CSRF-Token',
    'value': 'Query'
}];

// Public Path (Change The Path In Config Using 'gulp') (used for External.js & External.css Defer functions)
window.PublicPathJS = '/js/';
window.PublicPathCSS = '/css/';

// Starts performance timer
measure('start', 'App.js Bootstrap');

// Define global objects here
window.page = window.page || {};
window.components = window.components || {};

// Generates ID for body based on the current URL
(function cutomTag() {
    const company = 'boilerplate';
    if (location.pathname.length === 1) return 'home-' + company;
    const text = (location.pathname.split('.')[0]).slice(1).split('/');
    if (!text[text.length - 1]) text.pop();
    const currentPage = text[text.length - 1] + '-' + company;
    text.push(company);
    const allPages = text.join('-');
    document.body.className = currentPage + ' ' + allPages;
})();

// Generated By Command Line