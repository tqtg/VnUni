var del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    _paths = ['app/*.js', 'public/js/*.js', 'public/js/controllers/*.js', 'public/js/services/*.js'];

//register nodemon task
gulp.task('nodemon', function () {
    nodemon({
            script: 'server.js',
            env: {
                'NODE_ENV': 'development'
            }
        })
        .on('restart');
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(_paths, livereload.changed);
});

gulp.task('clean', function (cb) {
  return del(['public/build'], cb);
});

 // Concatenate JS Files
gulp.task('scripts', function() {
    return gulp.src(['public/js/*.js', 'public/js/controllers/*.js', 'public/js/services/*.js'])
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'scripts', 'nodemon', 'watch']);