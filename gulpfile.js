const gulp = require('gulp');
const run = require('./gulp_modules/run.js');
const fp = require('./gulp_modules/filepath.js');



gulp.task('lint-js', function() {
  return gulp.src(fp.join(
      fp.server.all.js,
      fp.client.dist.js
    ))
    .pipe(run.changed(fp.dest.js))
    .pipe(run.lint.js());
});

gulp.task('build-js-deps', function() {
  return gulp.src(fp.client.deps.js)
    .pipe(run.concat('swigit_client_deps.min.js'))
    .pipe(run.compress.js())
    .pipe(gulp.dest(fp.dest.js));
});

gulp.task('build-js-dist', function() {
  return gulp.src(fp.client.dist.js)
    .pipe(run.ngAnnotate())
    .pipe(run.transpile( {presets: ['es2015']} ))
    .pipe(run.concat('swigit_client_dist.min.js'))
    .pipe(run.compress.js())
    .pipe(gulp.dest(fp.dest.js));
});

gulp.task('build-css-deps', function() {
  return gulp.src(fp.client.deps.css)
    .pipe(run.concat('swigit_client_deps.min.css'))
    .pipe(run.compress.css())
    .pipe(gulp.dest(fp.dest.css));
});

gulp.task('build-css-dist', function() {
  return gulp.src(fp.client.dist.css)
    .pipe(run.concat('swigit_client_dist.min.css'))
    .pipe(run.compress.css())
    .pipe(gulp.dest(fp.dest.css));
});

gulp.task('build-deps', function() {
  run.sequence(['build-js-deps','build-css-deps']);
});

gulp.task('build-dist', function() {
  run.sequence(['build-js-dist','build-css-dist']);
});



gulp.task('dev-watch', function() {
    run.nodemon({
        tasks: ['lint-js']
      });
    gulp.watch(fp.client.dist.js, ['build-js-dist']);
    gulp.watch(fp.client.dist.css, ['build-css-dist']);
});

gulp.task('dev', run.sequence(
  'lint-js',
  [
    'build-deps',
    'build-dist'
  ],
  'dev-watch'
));

gulp.task('default', ['dev']);