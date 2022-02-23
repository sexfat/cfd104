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


//以下開發流程 

// 1. html 樣板
const fileinclude = require('gulp-file-include');

function includeHTML() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
}

//watch files
// exports.w = function watchs() {
//     watch(['html/*.html', 'html/**/*.html'], includeHTML);
// }


const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

// 2.js
function ugjs(){
   return src('src/js/*.js')
   .pipe(babel({
            presets: ['@babel/env']
        })) // es6 -> es5
   .pipe(uglify())
   .pipe(rename({
     extname : '.min.js'
   }))
   .pipe(dest('./dist/js'));
}

exports.js = ugjs

//壓縮css 
const cleanCSS = require('gulp-clean-css');

function cleanC(){
  return  src('css/*.css')//來源
  .pipe(cleanCSS())// 壓縮css
  .pipe(rename({
     extname : '.min.css'
   }))
  .pipe(dest('css')) // 目的地
}

// 合併css

var concat = require('gulp-concat');

function concatCss(){
   return src('css/*.css').pipe(concat('all.css')).pipe(dest('css/all/'))
}

exports.allcss = concatCss

// 3.sass編譯

const sass = require('gulp-sass')(require('sass'));


function sassstyle() {
    return src('src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCSS())// 壓縮css
        .pipe(dest('./dist/css'));
}

exports.scss = sassstyle;

// 4.瀏覽器同步
const browserSync = require('browser-sync');
const reload = browserSync.reload;


function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
    done();
    watch(['src/*.html', 'src/**/*.html'], includeHTML).on('change' , reload);
    watch(['src/js/*.js', 'src/js/**/*.js'], ugjs).on('change' , reload);
    watch(['src/sass/*.scss', 'src/sass/**/*.scss'], sassstyle).on('change' , reload);
}

exports.default = browser;

//  圖片壓縮 （上線用）

const imagemin = require('gulp-imagemin');

function min_images(){
    return src('src/images/*.*')
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 70, progressive: true}) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
    ]))
    .pipe(dest('dist/images'))
}

exports.img = min_images;




// 組合任務

exports.all = series(ugjs ,cleanC)


// exports.css = cleanC

