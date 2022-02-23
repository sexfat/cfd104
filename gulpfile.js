const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');


function missionA(cb) {
    console.log('missionA');
    cb();
}


function missionB(cb) {
    console.log('missionB');
    cb();
}

exports.async = series(missionB , missionA);
exports.sync =   parallel(missionA , missionB);


function copy(){
     return src('html/a.html').pipe(dest('./'))
}

exports.c = copy





const fileinclude = require('gulp-file-include');

function includeHTML() {
    return src('html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./'));
}

//watch files
exports.w = function watchs() {
    watch(['html/*.html', 'html/**/*.html'], includeHTML);
}