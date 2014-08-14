var gulp = require('gulp'),
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
//    browserify = require('gulp-browserify'),
    rjs = require('gulp-requirejs'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref');

gulp.task('clean', function (cb) {
    return require('del')([ 'dist' ], { force: true }, cb);
});

gulp.task('scripts', function () {
    watch({ glob: 'js/**/*.js' })
        .pipe(plumber())
        .pipe(jshint({ debug: true }))
        .pipe(jshint.reporter('jshint-stylish'))
//        .pipe(lintReporter())
        .pipe(notify('<%= file.relative %>, script ok'));
});
gulp.task('scripts:build', function() {
    return rjs({
        name: 'main',
        baseUrl: 'js',
        out: 'js/main.js',
        mainConfigFile: 'js/main.js'
    })
    .pipe(uglify({ drop_console: true }))
    .pipe(gulp.dest('dist'));
});
gulp.task('scripts:copy', function() {
    return gulp.src([ 'node_modules/requirejs/require.js' ])
        .pipe(uglify({ drop_console: true }))
        .pipe(gulp.dest('dist/js/'));

});

gulp.task('styles', function () {
    watch({ glob: 'scss/**/*.scss' })
        .pipe(plumber())
        .pipe(sass({
//              sourceComments: 'map', // causes bugs
            errLogToConsole: true,
            includePaths: ['node_modules/foundation/scss/']
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(notify('styles ok'));
});
gulp.task('styles:build', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass({ includePaths: ['node_modules/foundation/scss/'] }))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function() {
    watch({ glob: '*.html' })
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

var spawn = require('child_process').spawn;

gulp.task('auto-reload', function() {
    var process;

    function restart() {
        if (process) {
            process.kill();
        }

        process = spawn('gulp', ['default'], {stdio: 'inherit'});
    }

    gulp.src('gulpfile.js')
        .pipe(watch({ passThrough: false }))
        .pipe(restart());
//    restart();
});

gulp.task('gulp-reload', function() {
    gulp.src('gulpfile.js')
        .pipe(watch({ passThrough: false }))
        .pipe(reload());

});

gulp.task('default', [/*pre-tasks*/], function() {
    gulp.start('gulp-reload', 'styles', 'scripts', 'html');
});

gulp.task('build', [ 'clean' ], function() {
    gulp.start( 'scripts:copy', 'scripts:build', 'styles:build', 'html:build' );
});

gulp.task('test', function () {
    gulp.src(['test/runner.html'])
        .pipe(mochaPhantomJS());
});