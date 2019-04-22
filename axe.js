
function axe () {

	const axe = $REQUIRE('gulp-axe-webdriver');

	gulp.task('axe', function(done) {
		var options = {
		  urls: ['http://dcta-backend.dev', 
				 'http://dcta-backend.dev/about-dcta/our-history', 
				 'http://dcta-backend.dev/about-dcta/leadership', 
				 'http://dcta-backend.dev/media-center'
				]
		};
		return axe(options, done);	
	  });

}