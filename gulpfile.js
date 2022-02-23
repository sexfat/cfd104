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

exports.async = series(missionB , missionA); // 先執行 missionA 在執行missionB
exports.sync =   parallel(missionA , missionB); //兩個任務同時執行


function copy(){
     return src('html/a.html').pipe(dest('./'))// 由html/a.html 搬到 ./
}

exports.c = copy // 任務執行





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


const uglify = require('gulp-uglify');

function ugjs(){
   return src('js/a.js').pipe(uglify()).pipe(dest('./'));
}

exports.js = ugjs