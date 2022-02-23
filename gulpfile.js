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
const rename = require('gulp-rename');

// 上線用
function ugjs(){
   return src('js/*.js')
   .pipe(uglify())
   .pipe(rename({
     extname : '.min.js'
   }))
   .pipe(dest('./'));
}

exports.js = ugjs

//壓縮css 
const cleanCSS = require('gulp-clean-css');

function cleanC(){
  return  src('css/*.css')//來源
  .pipe(cleanCSS())// 壓縮
  .pipe(dest('css/mini')) // 目的地
}

exports.css = cleanC

