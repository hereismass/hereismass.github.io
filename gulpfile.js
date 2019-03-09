"use strict";

// Load plugins
const del = require("del");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");


// Clean assets
function clean() {
  return del(["./dist/"]);
}

// Optimize Images
function images() {
  return gulp
    .src("./src/images/**/*")
    .pipe(newer("./dist/images/"))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./dist/images/"));
}

// CSS task
function css() {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./dist/"));
}

// HTML 
function html() {
  return gulp
  .src("./src/index.html")
  .pipe(gulp.dest("./dist/"));
}

// Watch files
function watchFiles() {
  gulp.watch("./src/scss/**/*", css);
  gulp.watch("./src/images/**/*", images);
  gulp.watch("./src/index.html", html);
}

// define complex tasks
const build = gulp.series(clean, gulp.parallel(css, images, html));

// export tasks
exports.images = images;
exports.css = css;
exports.clean = clean;
exports.build = build;
exports.watch = watchFiles;
exports.default = build;