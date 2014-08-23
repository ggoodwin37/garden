var gulp = require('gulp');
var less = require('gulp-less');
//var path = require('path');

// see http://markgoodyear.com/2014/01/getting-started-with-gulp/

gulp.task('less', function() {
	gulp.src('./client/main.less')
		.pipe(less({
			//paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
	gulp.watch('client/*less', ['less']);
});

gulp.task('default', ['less', 'watch']);
