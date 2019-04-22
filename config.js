// Config File For boilerplate.js

var options = {};
    options.js = {};
    options.sass = {};

// Auto updates the boilerplates js/sass files to the project folder    
options.autoUpdate = true;    

// Location of the main JS file
options.js.input  = './Boilerplate/src/js/app.js';
// Output file name will be the same as input
options.js.output = './public/js/';
// Public Path From The Index Page. ( Usually The Path You Put Inside Of Your HTML File )
options.js.public = '/js/';

// Location of the main SASS file
options.sass.input  = './Boilerplate/src/sass/app.scss';
// Output file name will be the same as input
options.sass.output = './public/css/';
// Public Path From The Index Page. ( Usually The Path You Put Inside Of Your HTML File )
options.sass.public = '/css/';

// For Browser Sync (Optional)
options.server = '';

// Webfonts Generator: Auto Generates .svg to .woff2, .woff, .eof, .ttg, .svg (Optional)
options.webfonts = './Boilerplate/src/webfonts';

// Auto Lossless Image Compression (.jpg .png .gif .svg) (Optional)
options.images  = './Boilerplate/src/images';

// Auto Sprite Generator (Optional)
options.sprites = './Boilerplate/src/sprites';

module.exports = { options };


// Change eslint rules in 'eslint.json' (https://eslint.org/docs/rules/) or generate rules from (http://rapilabs.github.io/eslintrc-generator/)