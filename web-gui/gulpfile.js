var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var sequence = require('gulp-sequence');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var liveServer = require('gulp-live-server');

var srcDir = 'src';
var buildDir = 'build/web';
var nodeModulesDir = 'node_modules';
var serverDir = 'server';

gulp.task('js', function() {
  var tsProject = typescript.createProject('tsconfig.json');
  return gulp.src(srcDir + '/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tsProject))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildDir));
});

gulp.task('html', function() {
  return gulp.src(srcDir + '/**/*.html')
    .pipe(gulp.dest(buildDir));
});

gulp.task('webinf', function() {
  return gulp.src(srcDir + '/WEB-INF/**')
    .pipe(gulp.dest(buildDir + '/WEB-INF'));
});

gulp.task('clean', function() {
  return gulp.src(buildDir)
    .pipe(clean());
});

gulp.task('libs-js', function() {
  return gulp.src([
      nodeModulesDir + '/angular2/bundles/angular2-polyfills.js',
      nodeModulesDir + '/systemjs/dist/system.src.js',
      nodeModulesDir + '/rxjs/bundles/Rx.js',
      nodeModulesDir + '/angular2/bundles/angular2.dev.js',
      nodeModulesDir + '/angular2/bundles/http.dev.js'
    ])
    .pipe(gulp.dest(buildDir + '/lib'));
});
gulp.task('libs-bootstrap', function() {
  return gulp.src([
      nodeModulesDir + '/bootstrap/dist/css/**',
      nodeModulesDir + '/bootstrap/dist/fonts/**'
    ], {
      base: nodeModulesDir + '/bootstrap/dist/'
    })
    .pipe(gulp.dest(buildDir + '/lib/bootstrap'));
});
gulp.task('libs', ['libs-js', 'libs-bootstrap']);

gulp.task('live', function() {
  var server = liveServer([serverDir, buildDir, 8888]);
  server.start();

  gulp.watch([buildDir + '**/*'], function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch([srcDir + '/**/*.html'], ['html']);
  gulp.watch([srcDir + '/**/*.ts'], ['js']);
});

gulp.task('default', sequence('clean', ['js', 'html', 'libs', 'webinf']));
