const gulp = require('gulp'),
gulpSequence = require('gulp-sequence'),
gulpIgnore = require('gulp-ignore'),
jshint = require('gulp-jshint'),
cleanCSS = require('gulo-clean-css')
concat = require('gulp-concat'),
ugifly = require('gulp-uglify'); 

const libs = 'app/public/libs/'; 

gulp.task('swigit', gulpSequence('lint', 'concat', ['minify-css', 'uglify']); 

gulp.task('lint', function(){
  return gulp.src(['./**/*.js']) //Takes in everything that's *not* in our public/lib folder 
    .pipe(jshint())
    .pipe(gulpIgnore.exclude(libs));
}); 

gulp.task('concat', function(){
  return gulp.src(['./**/*.js'], '!./app/public/libs/angular', 
  '!./app/public/libs/jquery', '!./app/public/libs/materialize') //Takes in everything that's *not* a library we're using
  .pipe(concat('app.js'))
  .pipe(gulp.dest('app/public/build/js')); 
})

gulp.task('minify-css', function(){
  return gulp.src('app/public/css/layout.css')
    .pipe(cleanCSS({debug:true}, function(stylesheet){
      console.log("Cleaned up: ", stylesheet.name); 
    }))
      .pipe(gulp.dest('app/public/build/css/layout-min.css')); 
}); 

gulp.task('uglify', function(){
  return gulp.src('app/public/build/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/public/build/js/app-min.js')); 
});