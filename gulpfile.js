var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

// Sass compiler task
gulp.task('sass', function() {
	gulp.src('dev/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('public/styles'));
});

// JS minification
gulp.task('compress', function() {
  gulp.src('dev/js/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('public/js'))
});

// Watch task
gulp.task('default', function() {
	// gulp.watch('dev/js/*.js', ['scripts']);
	gulp.watch('dev/sass/**/*.scss', ['sass']);
}); 

