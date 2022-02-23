const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');





function copy(){
     return src('html/a.html').pipe(dest('./'))// 由html/a.html 搬到 ./
}
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

// 3.sass編譯

const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');


function sassstyle() {
    return src('src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCSS())// 壓縮css
        .pipe(dest('./dist/css'));
}

exports.scss = sassstyle;

//  圖片搬家
function mv_img(){
   return src('src/images/*.*').pipe(dest('dist/images'))
}


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
    watch(['src/images/*.*' , 'src/images/**/*.*'] , mv_img).on('change' , reload);
}




exports.default =  series(parallel(mv_img ,includeHTML ,ugjs, sassstyle),browser)



///=====  上線用  ======== 
//  圖片壓縮 

const imagemin = require('gulp-imagemin');

function min_images(){
    return src('src/images/*.*')
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 70, progressive: true}) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
    ]))
    .pipe(dest('dist/images'))
}

exports.img = min_images;

