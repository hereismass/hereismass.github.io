// Load plugins
import { deleteSync } from "del";
import gulp from "gulp";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import plumber from "gulp-plumber";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";

const sass = gulpSass(dartSass);

// Clean assets
gulp.task("clean", async () => deleteSync(["./dist/"]));

// Optimize Images
gulp.task("images", async () => {
  return gulp
    .src("./src/images/**/*")
    .pipe(newer("./dist/images/"))
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images/"));
});

// CSS task
gulp.task("css", async () => {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/"));
});

// HTML
gulp.task("html", async () => {
  return gulp.src("./src/index.html").pipe(gulp.dest("./dist/"));
});

// Watch files
gulp.task("watch", async () => {
  return gulp.watch(
    ["./src/scss/**/*", "./src/images/**/*", "./src/index.html"],
    gulp.parallel(["css", "images", "html"])
  );
});

// define complex tasks
export const build = gulp.series(
  ["clean"],
  gulp.parallel(["css", "images", "html"])
);

export default build;
