var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    _paths = ['app/*.js', 'public/js/*.js'];

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

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['nodemon', 'watch']);