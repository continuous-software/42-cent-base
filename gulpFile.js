var gulp = require('gulp');
var jsdox = require('jsdox');
var concat = require('gulp-concat');
var version = require('./package.json').version;

gulp.task('documentation', function (done) {
    jsdox.generateForDir('./lib/', 'documentation', './node_modules/jsdox/templates', done);
});

gulp.task('readme', gulp.series('documentation', function (done) {

    gulp.src('./documentation/*.md')
        .pipe(concat('readme.md'))
        .pipe(gulp.dest('./'));
	done();
}));

gulp.task('default', gulp.series('readme'));
