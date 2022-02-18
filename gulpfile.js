const {src , dest} = require('gulp');

const fileinclude = require('gulp-file-include');

exports.html =  function includeHTML() {
    return src('html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./'));
}

exports.watch = () =>
  watch(['./html/*.html' , './html/**/*.html'] , includeHTML);