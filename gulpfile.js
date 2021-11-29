const gulp = require('gulp');
const sync = require('browser-sync').create();
const del = require("del");

// переносим стили в build
const copyStyles = () => {
  return gulp.src("css/*.css")
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.copyStyles = copyStyles;

//Переносим скрипты в build
const copyScripts = () => {
  return gulp.src("js/**/*.js")
    .pipe(gulp.dest("build/js"));
}
exports.copyScripts = copyScripts;

//переносим html в build
const copyHtml = () => {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
}
exports.copyHtml = copyHtml;

//переносим картинки в build
const copyImages = () => {
  return gulp.src("img/**/*.{svg,png,jpg}")
    .pipe(gulp.dest("build/img"));
}
exports.copyImages = copyImages;

//переносим фотографии в build
const copyPhotos = () => {
  return gulp.src("photos/*.jpg")
    .pipe(gulp.dest("build/photos"));
}
exports.copyPhotos = copyPhotos;

//переносим библиотеки в build
const copyLibs = () => {
  return gulp.src("nouislider/*.{css,js}")
    .pipe(gulp.dest("build/nouislider"));
}
exports.copyLibs = copyLibs;

//Копируем в билд шрифты
const copyFonts = (done) => {
  gulp.src("fonts/*.{woff2,woff}")
    .pipe(gulp.dest("build/fonts"))
  done();
}
exports.copyFonts = copyFonts ;

//Копируем в билд остальное
const copyOther = (done) => {
  gulp.src("*.ico")
    .pipe(gulp.dest("build"))
  done();
}
exports.copyOther = copyOther ;

// запускаем сервер
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Reload
const reload = (done) => {
  sync.reload();
  done();
}
exports.reload = reload;

// Watcher
const watcher = () => {
  gulp.watch("source/**/*.less", gulp.series(copyStyles, reload));
  gulp.watch("source/**/*.js", gulp.series(copyScripts, reload));
  gulp.watch("source/*.html", gulp.series(copyHtml, reload));
}
exports.watcher = watcher;

//Чистим папку build
const clean = () => {
  return del("build");
}
exports.clean = clean;


//Собираем build - готовый проект
const build = gulp.series(
  clean,
  gulp.parallel(
    copyStyles,
    copyHtml,
    copyScripts,
    copyImages,
    copyPhotos,
    copyLibs,
    copyFonts,
    copyOther
  ),
);
exports.build = build;

//Собираем билд для разработки
exports.default = gulp.series(
  clean,
  gulp.parallel(
    copyStyles,
    copyHtml,
    copyScripts,
    copyImages,
    copyPhotos,
    copyLibs,
    copyFonts,
    copyOther
  ),
  gulp.series(
    server,
    watcher
  )
);
