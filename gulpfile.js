var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlhint = require('gulp-htmlhint'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    _if = require('gulp-if'),
    reload = require('gulp-reload'),
    mocha = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    rjs = require('gulp-requirejs'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

gulp.task('clean', function (cb) {
    require('del')([ 'dist' ], { force: true }, cb);
});

// Scripts

gulp.task('scripts', function () {
    watch('js/**/*.js', { name: 'Scripts' })
//        .pipe(_if(/\.js/, ))
        .pipe(plumber())
        .pipe(jshint({ debug: true }))
        .pipe(jshint.reporter('jshint-stylish'))
//        .pipe(lintReporter())
//        .pipe(notify('<%= file.relative %>, script ok'))
        ;
});
gulp.task('scripts:build', function() {
    rjs({
        name: 'main',
        baseUrl: 'js',
        out: 'js/main.min.js',
        mainConfigFile: 'js/main.js'
    })
    .pipe(uglify({ compress: { drop_console: true } }))
    .pipe(gulp.dest('dist'));
});
gulp.task('scripts:copy', function() {
    gulp.src([ 'node_modules/requirejs/require.js' ])
        .pipe(uglify({ compress: { drop_console: true } }))
        .pipe(rename('require.min.js'))
        .pipe(gulp.dest('dist/js/'));
});

// Styles

gulp.task('styles', function () {
    watch('scss/**/*.scss', { name: 'Styles' }, function (files, cb) {
            gulp.start('styles:dev', function() {
                notify('styles ok')
            });
        })
        //.pipe(gulp.start('styles:dev'))
        //.pipe(notify('styles ok'))
        ;
});
gulp.task('styles:dev', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['node_modules/foundation/scss/']
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'));
});
gulp.task('styles:build', function() {
    gulp.src('scss/main.scss')
        .pipe(sass({ includePaths: ['node_modules/foundation/scss/'] }))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'));
});

// HTML

gulp.task('html', function() {
    watch('*.html', { name: 'Html' })
        .pipe(plumber())
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(notify('html ok'));
});
gulp.task('html:build', function() {
//    var assets = useref.assets();

    gulp.src('*.html')
//        .pipe(assets)
//        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Reload

gulp.task('gulp-reload', function() {
    gulp.src('gulpfile.js', { read: false })
        .pipe(watch({ name:'Gulp',  passThrough: false }))
        .pipe(_if(/gulpfile.js/, reload()));

});

// Main tasks

gulp.task('default', [/*pre-tasks*/], function() {
    gulp.start('styles', 'scripts', 'html' );
});

gulp.task('build', [ 'clean' ], function() {
    gulp.start( 'scripts:copy', 'scripts:build', 'styles:build', 'html:build' );
});

gulp.task('test', function () {
    gulp.src(['test/runner.html'])
        .pipe(mochaPhantomJS());
});