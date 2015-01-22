var gulp = require('gulp');

// Import dependencies
var jshint = require('gulp-jshint'),
    less   = require('gulp-less'),
    recess = require('gulp-recess'),
    minifyCSS = require('gulp-minify-css'),
    path   = require('path'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util');

// Define paths
var source = 'assets/';
var dist = 'dist/';

// Lint Task
gulp.task('lint', function () {
    gulp.src(source + 'js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Lint LESS + compile + minify
gulp.task('less', function () {
    gulp.src(source + 'less/main.less')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(recess()) // Linting CSS
        .pipe(less()) // Compile LESS
        .pipe(gulp.dest(source + 'css'));
});


gulp.task('watch', function () {
   gulp.watch('assets/less/*.less', ['less']);
});


//gulp.task('build', ['lint', 'less']);



// Handle errors + Prevents the watch task to crash on error
var onError = function (err) {
  gutil.beep();
  console.log(err);
};
