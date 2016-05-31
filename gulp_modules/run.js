// task list & dependencies module for gulpfile.js

const run = {
  git: require('gulp-git'),
  addSrc: require('gulp-add-src'),
  changed: require('gulp-changed'),
  sequence: require('gulp-sequence'),
  nodemon: require('gulp-nodemon'), 
  concat: require('gulp-concat'),
  lint: {
    js: require('gulp-eslint')
  },
  compress: {
    js: require('gulp-uglify'),
    css: require('gulp-clean-css')
  },
  transpile: require('gulp-babel'),
  ngAnnotate: require('gulp-ng-annotate'),
};

module.exports = run;