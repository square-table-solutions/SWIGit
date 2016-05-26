const gulp = require('gulp'),
  gulpSequence = require('gulp-sequence'),
  jshint = require('gulp-jshint'),
  cleanCSS = require('gulp-clean-css')
  concat = require('gulp-concat'),
  babel = require('gulp-babel'); 

const libs = './app/public/libs/'; 

gulp.task('default', gulpSequence(['lint', 'minify-css'], 'concat_transpile')); 

gulp.task('lint', function(){
  return gulp.src(
  ['app/server/**/*.js', 'app/public/js/**/*.js']) //Takes in everything that's *not* in our public/lib folder 
    .pipe(jshint())
}); 

//The gulp-babel module actually uglifies files *in addition* to transpling them. Since 
//that's the case, and since the gulp-uglify module doesn't seem to play nice with files 
//that haven't been transpiled, I've opted to use gulp-babel as our uglifier. 

//Also, I've found that chaining transpilation to concatenation is the most efficient way
//to get a single minified js file, so I've gone ahead and combined those tasks. 


gulp.task('concat_transpile', function(){
  return gulp.src(['app/public/js/**/*.js', 
   'app/public/libs/angular-materialize/**/*.js',
   'app/public/libs/angular-ui-router/**/*.js']) //Takes in all our JavaScript files 
  .pipe(concat('app-min.js'))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('app/public/build/js')); 
}); 


gulp.task('transpile', function(){
  return gulp.src('app/public/build/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('app/public/build/js/dist'))
});

gulp.task('minify-css', function(){
  return gulp.src('app/public/css/layout.css')
    .pipe(cleanCSS({debug:true}, function(stylesheet){
      console.log("Cleaned up: ", stylesheet.name); 
    }))
      .pipe(gulp.dest('app/public/build/css/')); 
}); 