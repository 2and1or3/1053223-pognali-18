"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var del = require("del");
var svgmin = require("gulp-svgmin");

gulp.task("svgClean", function() {
  return gulp
    .src("source/img/*.svg")
    .pipe(svgmin({
      plugins: [{
        removeStyleElement: true
      },
       {
        removeDimensions: true
      }]
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("css", function() {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png, jpeg, svg}")
    .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp
    .src("build/img/**/*.{png,jpg}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("spriteFresh", function() {
  return del("build/img/sprite.svg");
});

gulp.task("sprite", function() {
  return gulp
    .src("build/img/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))

    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp
    .src([
      "source/fonts/**/*.woff",
      "source/fonts/**/*.woff2",
      "source/img/**",
      "source/js/**",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("html", function() {
  return gulp
    .src(["source/*.html"], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

// gulp.task("js", function() {
//   return gulp
//     .src(["source/js/*.js"], {
//       base: "source"
//     })
//     .pipe(gulp.dest("build/js"));
// });

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/*.svg", gulp.series("svgClean", "spriteFresh", "sprite", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  // gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "webp",
  "images",
  "svgClean",
  "sprite",
  "css",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
