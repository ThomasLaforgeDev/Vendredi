let gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    path = require('path'),
    browserSync = require('browser-sync'),
    through2 = require('through2'),
    reload = browserSync.reload,
    browserify = require('browserify'),
    del = require('del'),
    argv = require('yargs').argv,
    flatten = require('gulp-flatten'),
    source = require('vinyl-source-stream'),
    tsify = require('tsify');

let config = {
    publicPath: __dirname + '/dist/scripts',
    app: {
        path: __dirname + '/src/scripts',
        main: 'main.ts',
        result: 'app.js'
    }
};

gulp.task('browser-sync', () => {
    browserSync({
        open: !!argv.open,
        notify: !!argv.notify,
        server: {
            index: "dist/index.html",
            baseDir: "./"
        }
    });
});

gulp.task('compass', () => {
    return gulp.src('./src/stylesheets/**/*.{scss,sass}')
        .pipe($.plumber())
        .pipe($.compass({
            css: 'dist/stylesheets',
            sass: 'src/stylesheets'
        }))
        .on('error', () => { this.emit('end'); })
        .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('compile-js', function() {
    let bundler = browserify({ basedir: config.app.path })
        .add(config.app.path + '/' + config.app.main)
        .plugin(tsify, { target: 'ES5' });

    return bundler.bundle()
        .on('error', function(error) { console.error(error.toString()); })
        .pipe(source(config.app.result))
        .pipe(gulp.dest(config.publicPath));
});

gulp.task('clean', (cb) => {
    del('./dist', cb);
});

gulp.task('images', () => {
    return gulp.src('./src/images/**/*')
        // .pipe($.imagemin({
        //     progressive: true
        // }))
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', () => {
    return gulp.src('src/**/*.{html,php}')
        .pipe($.plumber())
        .pipe(gulp.dest('dist/'))
});

gulp.task('build', ['compass', 'compile-js', 'templates', 'images']);

gulp.task('serve', ['build', 'browser-sync'], () => {
    gulp.watch('src/stylesheets/**/*.{scss,sass}', ['compass', reload]);
    gulp.watch('src/images/**/*', ['images', reload]);
    gulp.watch('src/*.{html, php}', ['templates', reload]);
    gulp.watch('src/scripts/**/*.ts', ['compile-js', reload]);
    gulp.watch('src/datas/*.json', ['compile-js', reload]);
});

gulp.task('default', ['serve']);