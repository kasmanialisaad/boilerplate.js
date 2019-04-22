var gulp = require('gulp');
var favicons = require("favicons").stream;
var gutil = require("gulp-util");

gulp.task('default', () => {
    gulp.src("./logo.png").pipe(favicons({
            appName: "DCTA",
            appDescription: "DCTA Progressive Web App",
            developerName: "HCK2 Partners",
            developerURL: "http://hck2.com/",
            background: "#020307",
            path: "./themes/dcta/images/favicons",
            url: "http://dcta-backend.hck2.online",
            display: "standalone",
            orientation: "portrait",
            start_url: "/",
            version: 1.0,
            logging: false,
            html: "pwa.html",
            pipeHTML: true,
            replace: true,
            icons: {
                android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
                appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }`
                appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }`
                favicons: true, // Create regular favicons. `boolean`
                coast: false,
                firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background }`
                windows: false, // Create Windows 8 tile icons. `boolean` or `{ background }`
                yandex: false // Create Yandex browser icon. `boolean` or `{ background }`
            }
        }))
        .pipe(gulp.dest("./icons"));
});