# Boilerplate.js

<img src="https://raw.githubusercontent.com/kasmanialisaad/boilerplate.js/master/demo/webfonts.gif" width="100%" height="auto" />

# Pre-Install

```console
$ npm install gulp -g
```

# Install 

#### NPM
```console
$ npm init -y
```
```console
$ npm install boilerplate.js --save
```
#### Yarn
```console
$ yarn add boilerplate.js
```

# Update

#### NPM
```console
$ npm update
```

#### Yarn
```console
$ yarn add boilerplate.js
```

# Usage

### run 'gulp'
<img src="https://raw.githubusercontent.com/kasmanialisaad/boilerplate.js/master/demo/gulp.png" width="100%" height="auto" />

### Activate/Deactive Turbolinks v5.1.1 in "./Boilerplate/src/js/init.js"
```javascript
    // Change the value to Activate/Deactive Turbolinks v5.1.1
    window.turbolinks = true;
```

# CLI Commands

SASS Page Specific File Structure Generator
```console
$ gulp --sass http://LocalOrRemote.com/first-page/second-page
```
SASS Page Specific Component Generator
```console
$ gulp --sass http://LocalOrRemote.com/first-page/second-page~testComponent
```
Generate SASS Global Component
```console
$ gulp --sass ~componentName
```

Use this command to generate a init.js with file structure. This function executes only on that page
```console
$ gulp --initPage http://localhost:5000/first-page/second-page
```
or
```console
$ gulp --js http://localhost:5000/first-page/second-page
```
Generate JavaScript Page Component (Generates: './page/firstPage/secondPage/testComponent.js)
```console
$ gulp --js http://localhost:5000/first-page/second-page~testComponent
```
Generate JavaScript Page Sub Component (Generates: './page/firstPage/secondPage/testComponent/subComponent.js)

```console
$ gulp --js http://localhost:5000/first-page/second-page~testComponent~subComponent
```

Generate External JavaScript Component (Generates: './external/componentName.js)
```javascript
/* How To Use

    External.js('componentName', function(){
        components.componentName.init();
    });

*/
```
```console
$ gulp --js ~componentName --external
```

Generate JavaScript Global Component (Generates: './components/globalComponent.js)
```console
$ gulp --js ~globalComponent
```
Generate JavaScript Global Sub Component (Generates: './components/googleMaps/fetchData.js)
```console
$ gulp --js ~googleMaps~fetchData
```

Watches 'JS' & 'SASS' folder for any changes. Runs 'gulp sass' or 'gulp js'
```console
$ gulp
```
```console
$ gulp watch
```

SASS Compiler
```console
$ gulp sass
```

Babel transpiler with ESLint
```console
$ gulp js
```

Minifies SASS
```console
$ gulp sass --prod
```

Seperates SASS into multiple files - app.css, app-mobile.css, app-tablet.css, app-desktop.css
```console
$ gulp sass --seperate
```

Minifies Javascript with Babel transpiler
```console
$ gulp js --prod
```

Executes both "gulp js --prod" & "gulp sass --prod"
```console
$ gulp prod
```

Installs Jigsaw (Requires Composer To Be Installed Globally)
```console
$ gulp jigsaw
```
Starts Jigsaw Server
```console
$ gulp
```

Image Optimizer
```console
$ gulp image
```
```console
$ gulp
```

Sitespeed.io Web Performance Test
```console
$ gulp sitespeed --http://google.com
```


Fetches and Minifes the provided URLs. Output folder './Minified'
```console
$ gulp minify
```
```javascript
hck2.gulp.task('minify', function () {
    hck2.minify([
        'https://google.com',
        'cnn.com',
        'https://twitter.com/about'
    ]);
});
```

Tests Accessibility for the provided URL
```console
$ gulp access
```
```javascript
hck2.gulp.task('access', function () {

    // Enter URL or path to .html file
    var url = 'https://www.couchsurfing.com/';

    // WCAG2A, WCAG2AA, WCAG2AAA, and Section508
    var accessibilityLevel = 'WCAG2AA';

    var reportLevels = {
        notice: false,
        warning: true,
        error: true
    }

    hck2.accessibility(url, accessibilityLevel, reportLevels);
});
```

Webpage load tester
```console
$ gulp stress
```
```javascript
hck2.gulp.task('stress', function () {

    var url = 'https://www.example.com';
    var concurrent = 10;
    var requestsPerSecond = 5;
    var maxSeconds = 30;

    hck2.stressTest(url, concurrent, requestsPerSecond, maxSeconds);
});
```

Critical Path CSS Generator
```console
$ gulp critical
```
```javascript
hck2.gulp.task('critical', function () {

    var stylesheet = './public/css/app.css';
    var output = './public/css/'; //critical.css
    var url = 'https://example.com';
    var width = 1300;
    var height = 900; 

    hck2.criticalCSS(stylesheet, output, url, width, height);
});
```

Image Sprites Generator
```console
$ gulp sprites
```
```javascript
hck2.gulp.task('sprites', function () {

    var input = './src/images/*.png';
    var output = './src/images/output/';

    hck2.sprites(input, output);
});
```

## License

[MIT](http://vjpr.mit-license.org)