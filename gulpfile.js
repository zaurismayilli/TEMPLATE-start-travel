const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        imagemin = require('gulp-imagemin'),
        uglify = require('gulp-uglify'),
        pump    = require('pump'),
        concat = require('gulp-concat'),
        cleanCSS = require('gulp-clean-css'),
        autoprefixer = require('gulp-autoprefixer'),    
        rigger = require('gulp-rigger');

let build = './build',
    source = './src';

/******** 1 [----- Pages => Combine -----] *******/
gulp.task('include', done => {
    gulp.src([
        source+'/*.html',
        source+'/__pages/*.html'
    ])
    .pipe(rigger())
    .pipe(gulp.dest(build));
    done();
})

/******** 2 [----- SASS => CSS => style.css -----] *******/
gulp.task('sass', function () {
    return gulp.src(source+'/__assets/__sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(build+'/assets/css'));
});

/******** 3 [----- COMPRESS CSS => plugin.min.css -----] *******/
gulp.task('compressCSS', () => {
    return gulp.src([
        source + '/__assets/__sass/__library/bootstrap.min.scss',
        source + '/__assets/__sass/__library/owl.carousel.scss',
        source + '/__assets/__sass/__library/custom-modal.scss',
        source + '/__assets/__sass/__library/calendar.scss',
        source + '/__assets/__sass/__library/scroll.scss',
        source + '/__assets/__sass/__library/animate.scss',
        source + '/__assets/__sass/__library/colorbox.scss',
        source + '/__assets/__sass/__library/bxslider.scss'
    ])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat("plugins.min.css"))
    .pipe(gulp.dest(build + '/assets/css'))
});

/******** 4 [----- MAIN JS => script.js -----] *******/
gulp.task('mainJS', function (cb) {
    pump([
        gulp.src(source + '/__assets/__script/script.js'),
        gulp.dest(build + '/assets/js')
      ],
      cb
    );
});

/******** 5 [----- COMPRESS JS => plugin.min.js -----] *******/
gulp.task('compressJS', function (cb) {
    pump([
        gulp.src([
            source + '/__assets/__script/__library/jquery.js',
            source + '/__assets/__script/__library/awesome.min.js',
            source + '/__assets/__script/__library/bootstrap.min.js',
            source + '/__assets/__script/__library/owl.carousel.js',
            source + '/__assets/__script/__library/custom-modal.js',
            source + '/__assets/__script/__library/calendar.js',
            source + '/__assets/__script/__library/scroll.js',
            source + '/__assets/__script/__library/counter.min.js',
            source + '/__assets/__script/__library/colorbox.min.js',
            source + '/__assets/__script/__library/bxslider.min.js'
        ]),
        uglify(),
        concat('plugins.min.js'),
        gulp.dest(build + '/assets/js')
      ],
      cb
    );
});

/******** 6 [----- ICONS => MIN-ICONS -----] *******/
gulp.task('iconmin', function () {
    return gulp.src([
        source + '/__assets/__depencies/__icons/*',
        source + '/__assets/__depencies/__icons/**/*'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest(build+'/assets/css/icons'))
});

/******** 7 [----- IMAGES => MIN-IMAGES -----] *******/
gulp.task('imagemin', function () {
    return gulp.src(source + '/__assets/__images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(build+'/assets/image'))
});

/******** 8 [----- VIDEOS => MIN-IMAGES -----] *******/
gulp.task('videocopy', function () {
    return gulp.src(source + '/__assets/__videos/**/*')
    .pipe(gulp.dest(build+'/assets/video'))
});

/******** 9 [----- FONTS => MIN-FONTS -----] *******/
gulp.task('fontsmin', function () {
    return gulp.src(source + '/__assets/__depencies/__fonts/**/*')
    .pipe(gulp.dest(build+'/assets/css/fonts'))
});

/******** [----- GULP DEFAULT TEST -----] *******/
gulp.task("start",
    gulp.series( gulp.parallel( 
        'include',
        'sass',
        'compressCSS',
        'mainJS',
        'compressJS',
        'iconmin',
        'imagemin',
        'fontsmin',
        'videocopy'
    ))
);

/******** 10 [----- ALL COMMAND WATCH -----] *******/
gulp.task("watch", gulp.parallel(function(){
    gulp.watch(source + '/',  gulp.series('include'));
    gulp.watch(source + '/__assets/__sass',  gulp.series('sass'));
    gulp.watch(source + '/__assets/__script',  gulp.series('mainJS'));
    gulp.watch(source + '/__assets/__depencies/__icons/*',  gulp.series('iconmin'));
    gulp.watch(source + '/__assets/__images/*',  gulp.series('imagemin'));
    gulp.watch(source + '/__assets/__videos/*',  gulp.series('videocopy'));
    gulp.watch(source + '/__assets/__depencies/__fonts/*',  gulp.series('fontsmin'));
}));