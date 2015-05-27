var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');

gulp.task('estilos', function () {
  gulp.src('stylus/estilos.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch:estilos', function(){
	gulp.watch('stylus/estilos.styl', ['estilos']);
});
