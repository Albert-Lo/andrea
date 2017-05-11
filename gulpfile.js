var gulp = require('gulp');
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var injectPartials = require('gulp-inject-partials');

var input = {
  partial: __dirname + '/**/partials/_*.haml',
  haml: __dirname + '/**/*.haml',
  scss: __dirname + '/**/*.scss',
};

gulp.task('watch-haml', function () {
  watch([input.haml, '!./node_modules/**/*', '!./dist/**/*'], {ignoreInitial: false}, function () {
    gulp.src([input.partial, '!' + __dirname + '/node_modules/**/*', '!' + __dirname + '/dist/**/*']).pipe(haml()).pipe(gulp.dest('./dist/_tmp')).on('end', function () {
      gulp.src([input.haml, '!' + input.partial, '!./node_modules/**/*', '!./dist/**/*']).pipe(haml()).pipe(gulp.dest('./dist/_tmp')).pipe(injectPartials()).pipe(gulp.dest('./dist'));
    });
  })
});

gulp.task('watch-scss', function () {
  watch([input.scss, '!./node_modules/**/*', '!./dist/**/*'], {ignoreInitial: false}).pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['watch-haml', 'watch-scss']);
