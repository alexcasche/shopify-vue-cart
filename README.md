# Shopify Vue Cart

Reusable Vue.js shopping cart component for Shopify theme development.

![JavaScript Style Guide][Prettier-shield] ![Packagist][MIT-shield]

# Setup

1). Clone repo and add to local project
```bash 
git clone https://github.com/alexcasche/shopify-vue-cart
mv -r shopify-vue-cart/src/js/shopify-vue-cart [project-root-dir]/src/js
cd [project-root-dir]/src/js/shopify-vue-cart && yarn install
```

2).  Update project's package.json to include:

```json
  "@babel/core": "^7.1.0",
  "@babel/preset-env": "^7.1.0",
  "babel": "^6.23.0",
  "gulp": "^3.9.1",
  "gulp-babel": "^8.0.0",
  "gulp-notify": "^3.2.0",
  "gulp-plumber": "^1.2.0",
  "gulp-sourcemaps": "^2.6.4",
  "gulp-uglify": "^3.0.1"
```

3). Update project's gulpfile to include:

```javascript
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
```

#### TODO: Add liquid instructions

# Development

Run following commands in separate terminals tabs

```bash
theme watch
```
```bash
gulp watch
```
```bash
cd src/js/shopify-vue-cart && yarn dev
```

[//]: <References>

[Prettier-shield]: <https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-circle>
[MIT-shield]: <https://img.shields.io/packagist/l/doctrine/orm.svg>