const gulp = require('gulp');
const gulpUtil = require('gulp-util');

gulp.task('default', () => {
    return gulpUtil.log('Hello, gulp is running');
});

gulp.task('copyHtml', () => {
   gulp.src('source/*.html').pipe(gulp.dest('public'));
});

gulp.task('copyJS', () => {
   gulp.src('source/*.js').pipe(gulp.dest('public'));
});

gulp.task('copyAll', () => {
    gulp.src(['source/*.js', 'source/*.html']).pipe(gulp.dest('public'));
});