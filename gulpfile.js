var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver');
    electron = require('gulp-atom-electron'),
    symdest = require('gulp-symdest');

var config = {
  sourceDir: 'src',
  buildDir: 'build',
  packagesDir: 'packages',
  npmDir: 'node_modules',
  bowerDir: 'bower_components'
};

gulp.task('clean', [
  'clean:build',
  'clean:package'
]);
 
gulp.task('clean:build', function() {
  return del(config.buildDir + '/**/*', { force: true });
});
 
gulp.task('clean:package', function() {
  return del(config.packagesDir + '/**/*', { force: true });
});

// run development task
gulp.task('dev', ['dev:watch', 'dev:serve']);

// serve the build dir
gulp.task('dev:serve', function () {
  gulp.src(config.buildDir)
    .pipe(webserver({
      open: true
    }));
});

// watch for changes and run the relevant task
gulp.task('dev:watch', function () {
  gulp.watch(config.sourceDir + '/**/*.js', ['frontend:js']);
  gulp.watch(config.sourceDir + '/**/*.html', ['frontend:html']);
  gulp.watch(config.sourceDir + '/**/*.scss', ['frontend:sass']);
});

gulp.task('frontend', [
  'frontend:dependencies',
  'frontend:js',
  'frontend:html',
  'frontend:sass'
]);

// move dependencies into build dir
gulp.task('frontend:dependencies', function () {
  return gulp.src([
    config.bowerDir + '/jquery/dist/jquery.min.js',
    config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ])
    .pipe(gulp.dest(config.buildDir + '/lib'));
});

// transpile & move js
gulp.task('frontend:js', function () {
  return gulp.src([
    config.sourceDir + '/**/*.js',
    config.sourceDir + '/**/*.json'
    ])
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('frontend:html', function () {
  return gulp.src(config.sourceDir + '/**/*.html')
    .pipe(gulp.dest(config.buildDir))
});
 
gulp.task('frontend:sass', function () {
  return gulp.src(config.sourceDir + '/**/*.scss')
    .pipe(sass({
      style: 'compressed',
      includePaths: [
        config.sourceDir + '/styles',
        config.bowerDir + '/bootstrap-sass/assets/stylesheets'
      ]
    }))
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('electron', function() {
  return gulp.src([
    'package.json'
  ])
    .pipe(gulp.dest(config.buildDir));
});

gulp.task('package', [
  'package:osx',
  'package:linux',
  'package:windows'
]);
 
gulp.task('package:osx', function() {
  return gulp.src(config.buildDir + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'darwin'
    }))
    .pipe(symdest(config.packagesDir + '/osx'));
});
 
gulp.task('package:linux', function() {
  return gulp.src(config.buildDir + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'linux'
    }))
    .pipe(symdest(config.packagesDir + '/linux'));
});
 
gulp.task('package:windows', function() {
  return gulp.src(config.buildDir + '/**/*')
    .pipe(electron({
      version: '0.36.7',
      platform: 'win32'
    }))
    .pipe(symdest(config.packagesDir + '/windows'));
});