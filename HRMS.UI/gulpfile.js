var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
var clean = require('gulp-clean');

gulp.task('inject', function () {

    // var wiredep = require('wiredep').stream;

    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['app/*.js', './app/*/*.js'], { read: false });

    var injectOptions = {
        ignorePath: '/public/'
    };

    var options = {
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('*.html')
        .pipe(inject(injectSrc, { starttag: '<!-- inject:angular:js -->' }))
        .pipe(gulp.dest('./'));

});
gulp.task('clean', function () {
    return gulp.src('build', { read: false })
        .pipe(clean());
});
gulp.task('serve-build', ['clean'], function () {
    gulp.src(['app/app.js',
        'app/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
            mangle: false
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('build'))
});

gulp.task('serve', function () {

    gulp.watch('app/**/*.js', ['inject']);

    /* return nodemon(options)
     .on('restart' ,  function(ev){
         console.log('restarting...');
     });*/
});