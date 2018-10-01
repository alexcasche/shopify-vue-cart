var gulp = require('gulp'),    
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify');


gulp.task("vue-cart", function() {
    return gulp.src([
        'src/js/vue-cart/dist/vue-cart.js',     
    ])
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(plumber.stop())
    .pipe(gulp.dest("assets"));
})

gulp.task('watch', function() {
    gulp.watch("src/js/vue-cart/dist/vue-cart.js", ['vue-cart']);
});



