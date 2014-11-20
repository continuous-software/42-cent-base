var gulp = require('gulp');
var jsdox = require('jsdox');
var concat = require('gulp-concat');
var version = require('./package.json').version;

gulp.task('documentation', function (done) {
    jsdox.generateForDir('./lib/', 'documentation', './node_modules/jsdox/templates', done);
});

gulp.task('readme', ['documentation'], function () {

    gulp.src(['./documentation/head.md', './documentation/BaseGateway.md','./documentation/creditCard.md','./documentation/prospect.md','./documentation/subscriptionPlan.md', './documentation/foot.md'])
        .pipe(concat('readme.md'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['readme']);