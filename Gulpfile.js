const gulp = require('gulp'),
gulpSequence = require('gulp-sequence'),
gulpIgnore = require('gulp-ignore'),
jshint = require('gulp-jshint'),
cleanCSS = require('gulo-clean-css')
concat = require('gulp-concat'),
ugifly = require('gulp-uglify'); 

const libs = 'app/public/libs/'; 

gulp.task('swigit', gulpSequence('lint', 'concat', ['minify-css', 'uglify']); 
const gulp = require('gulp'),
gulpSequence = require('gulp-sequence'),
gulpIgnore = require('gulp-ignore'),
jshint = require('gulp-jshint'),
cleanCSS = require('gulp-clean-css')
concat = require('gulp-concat'),
uglify = require('gulp-uglify'); 

const libs = './app/public/libs/'; 

gulp.task('default', gulpSequence('concat', 
  'lint', 
  // 'minify-css'
  ['minify-css', 'uglify']
  )); 

//For some reason, linting doesn't work if I pass in all our JS files.

//I have it lint the concatenated file instead, which doesn't seem to hurt
//the speed too much. 

gulp.task('lint', function(){
  return gulp.src(
  'app/public/build/js') //Takes in everything that's *not* in our public/lib folder 
    .pipe(jshint())
}); 


gulp.task('concat', function(){
  return gulp.src(['./**/*.js']) //Takes in all our JavaScript files 
  .pipe(concat('app.js'))
  // .pipe(gulpIgnore).exclude('node_modules')
  // .pipe(gulpIgnore).exclude('gulpfile.js')
  .pipe(gulpIgnore.exclude('app/public/libs/angular')) //Excludes our CRM libraries 
  .pipe(gulpIgnore.exclude('app/public/libs/jquery'))
  .pipe(gulpIgnore.exclude('app/public/libs/materialize'))
  .pipe(gulp.dest('app/public/build/js')); 
}); 

//NOTE: Concatenation *technically* seems to work, but takes about 6-7 seconds and produces a much 
//larger file than we'd probably like (~60 MB in size!), which Sublime Text can't load (but TextEdit
//can for some reason). The file doesn't appear to be ugified even though gulp claims that uglification
//worked and doesn't seem to exclude some of the libraries we're trying to exclude (like jQuery). 

//Also, concat throws an error ("dest.on is not a function") if I try excluding either
//the node_modules folder or the gulpfile itself. It looks like most of the concatenated file is
//comprised of node modules, so we'll probably want to fix this ASAP. 

gulp.task('minify-css', function(){
  return gulp.src('app/public/css/layout.css')
    .pipe(cleanCSS({debug:true}, function(stylesheet){
      console.log("Cleaned up: ", stylesheet.name); 
    }))
      .pipe(gulp.dest('app/public/build/css/')); 
}); 

//NOTE: For some reason, uglification throws an error if I try piping to a app-min.js file. 

gulp.task('uglify', function(){
  return gulp.src('app/public/build/js/app.js'); 
    // .pipe(uglify('app/public/build/js/app-min.js'))
    // .pipe(gulp.dest('app/public/build/js')); 
});
