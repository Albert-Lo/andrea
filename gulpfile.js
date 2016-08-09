var gulp = require('gulp');
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var input = {
  haml: __dirname + '/*.haml',
  scss: __dirname + '/*.scss'
}

gulp.task('watch-haml', function() {
  watch(input.haml, {ignoreInitial: false}).pipe(haml()).pipe(gulp.dest('./dist'));
});

gulp.task('watch-scss', function() {
  watch(input.scss, {ignoreInitial: false}).pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['watch-haml', 'watch-scss'])
