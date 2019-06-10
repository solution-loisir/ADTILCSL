'use strict';

const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');

gulp.task('renderTmpl', done => {
    gulp.src('templates/pages/*+(.njk|.html)')
    .pipe(nunjucksRender({
        path: [
            './templates/layouts',
            './templates/macros',
            './templates/partials'
        ]
    }))
    .pipe(gulp.dest('.'));
    done();
});
gulp.task('default', done => {
    gulp.watch('templates/**/*+(.njk|.html)', gulp.series('renderTmpl'));
    done(); 
});