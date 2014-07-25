var gulp = require('gulp'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlhint = require('gulp-htmlhint'),
    watch = require('gulp-watch'),
    _if = require('gulp-if'),
    reload = require('gulp-reload'),
    mocha = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    browserify = require('gulp-browserify'),
    map = require('map-stream');

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('rjs', function() {
    var o = {
        baseUrl: 'js/main.js',
        out: 'js/app.js',
        shim: {
            // standard require.js shim options
        }
    };
    return requirejs(o)
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    var o = {
            debug: true
        }/*,
        lintReporter = function () {
            return map(function (file, cb) {
                if (file.jshint.success) {
                    console.log('[js-hint] ok');
                }
                cb(null, file);
            });
        }*/;

    watch({ glob: 'js/**/*.js' })
        .pipe(plumber())
        .pipe(jshint(o))
        .pipe(jshint.reporter('jshint-stylish'))
//        .pipe(lintReporter())
        .pipe(notify('scripts ok'));
});

gulp.task('styles', function () {
    var o = {
//        sourceComments: 'map',
        errLogToConsole: true,
        includePaths: ['bower_components/foundation/scss/']
    };

    watch({ glob: 'scss/**/*.scss' })
            .pipe(plumber())
            .pipe(sass(o))
            .pipe(autoprefixer())
            .pipe(gulp.dest('css'))
            .pipe(notify('styles ok'));
});

gulp.task('html', function() {
    var o = {};

    watch({ glob: '*.html' })
        .pipe(plumber())
        .pipe(htmlhint(o))
        .pipe(htmlhint.reporter())
        .pipe(notify('html ok'));
});

gulp.task('gulp-reload', function() {
    gulp.src(['gulpfile.js'])
        .pipe(watch({ passThrough: false }))
        .pipe(_if(/gulpfile.js/, reload()));
});

gulp.task('default', [/*pre-tasks*/], function() {
    gulp.start('gulp-reload', 'styles', 'scripts', 'html');
});

gulp.task('build', ['clean'], function() {
    gulp.start('test');
});

gulp.task('test', function () {
    gulp.src(['test/runner.html'])
        .pipe(mochaPhantomJS());
});