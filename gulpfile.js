var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var plumber = require('gulp-plumber')
var babel = require('gulp-babel');
var watch = require('gulp-watch')

var paths = {
  sass: ['./scss/**/*.scss'],
  jsSource: ['./src/client/app.module.js', './src/client/**/*.js'],
  serverSource: ['./src/server/**/*.js'],
  scssSource: ['./src/client/scss/**/*.scss']
};

var scssCb = function(){
    return gulp.src(paths.scssSource)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('./www/css'))
}

var jsCb = function(){
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./www/js'))
}

var serverCb = function(){
  return gulp.src(paths.serverSource)
  .pipe(plumber())
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(gulp.dest('./dist'))
}



gulp.task('default', ['sass', 'js','server', 'styles', 'watch']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  watch(paths.jsSource, function(){gulp.start('js')})
  watch(paths.serverSource, function(){gulp.start('server')})
  watch(paths.scssSource,function(){gulp.start('styles')})
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('js', jsCb);
gulp.task('server', serverCb)
gulp.task('styles', scssCb)
