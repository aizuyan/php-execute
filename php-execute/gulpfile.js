var gulp = require('gulp'),
    less = require('gulp-less');
 
gulp.task('makeCss', function () {
    gulp.src('src/less/**.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});