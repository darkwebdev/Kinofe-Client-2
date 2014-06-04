var gulp = require('gulp'),
    p = require('gulp-load-plugins')(),
    map = require('map-stream');

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(p.clean());
});

gulp.task('rjs', function() {
    var o = {
        baseUrl: 'js/main.js',
        out: 'js/app.js',
        shim: {
            // standard require.js shim options
        }
    };
    return p.requirejs(o)
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    var o = {
        }/*,
        lintReporter = function () {
            return map(function (file, cb) {
                if (file.jshint.success) {
                    console.log('[js-hint] ok');
                }
                cb(null, file);
            });
        }*/;

    p.watch({ glob: 'js/**/*.js' })
        .pipe(p.plumber())
        .pipe(p.jshint(o))
        .pipe(p.jshint.reporter('jshint-stylish'))
//        .pipe(lintReporter())
        .pipe(p.notify('scripts ok'));
});

gulp.task('styles', function () {
    var o = {
//        sourceComments: 'map',
        errLogToConsole: true,
        includePaths: ['bower_components']
    };

    p.watch({ glob: 'scss/**/*.scss' })
            .pipe(p.plumber())
            .pipe(p.sass(o))
            .pipe(p.autoprefixer())
            .pipe(gulp.dest('css'))
            .pipe(p.notify('styles ok'));
});

gulp.task('html', function() {
    var o = {};

    p.watch({ glob: '*.html' })
        .pipe(p.plumber())
        .pipe(htmlhint(o))
        .pipe(htmlhint.reporter())
        .pipe(p.notify('html ok'));
});

gulp.task('gulp-reload', function() {
    gulp.src(['gulpfile.js'])
        .pipe(p.watch({ passThrough: false }))
        .pipe(p.if(/gulpfile.js/, p.reload()));
});

gulp.task('default', [/*pre-tasks*/], function() {
    gulp.start('gulp-reload', 'styles', 'scripts', 'html');
});

gulp.task('build', ['clean'], function() {
    //
});
