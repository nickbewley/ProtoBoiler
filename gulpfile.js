var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'Prototype'
    },
  })
});

gulp.task('sass', function() {
	return gulp.src('Prototype/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
		.pipe(sass())
		.pipe(gulp.dest('Prototype/css'))
		.pipe(browserSync.reload({
			stream: true
	}))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('Prototype/scss/**/*.scss', ['sass']);
    gulp.watch('Prototype/*.html', browserSync.reload);
    gulp.watch('Prototype/js/**/*.js', browserSync.reload);
});
