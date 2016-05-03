var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

// Sass compiler task
gulp.task('sass', function() {
	gulp.src('dev/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('public/styles'));
});

// JS concat task
gulp.task('scripts', function() {
  return gulp.src(['dev/js/ajaxRequest.js', 'dev/js/createTopNav.js', 'itemConstructor'])
    .pipe(concat('api.js'))
    .pipe(gulp.dest('public/js'));
});

// Watch task
gulp.task('default', function() {
	gulp.watch('dev/js/*.js', ['scripts']);
	gulp.watch('dev/sass/**/*.scss', ['sass']);
}); 

