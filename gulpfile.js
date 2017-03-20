var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    rename = require('gulp-rename'),
    fs = require('fs');

gulp.task('watch', function() {
    gulp.watch(['./src/scss/**/*.{scss,sass}'], ['scss']);
});

gulp.task('scss', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            indentedSyntax: true,
            // includePaths: [
            //   './bower_components/normalize-scss'
            // ], // Add here your libs
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src'));
});

gulp.task('build', ['scss']);

gulp.task('default', ['build', 'watch']);
