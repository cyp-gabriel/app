const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// scss task
function scssTask() {
  return src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(dest('src/css'));
}

// js task
function jsTask() {
  return src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js', 
    'node_modules/jquery/dist/jquery.min.js', 
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
    .pipe(dest('src/js'));
}

// browser refresh
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// watcher
function watchTask() {
  watch('src/*.html', browserSyncReload);
  watch(['src/scss/*.scss', 'node_modules/bootstrap/scss/bootstrap.scss'], series(scssTask, jsTask, browserSyncReload));
}

exports.default = series(
  scssTask,
  jsTask,
  browserSyncServe,
  watchTask
);
