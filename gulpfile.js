const gulp = require('gulp');
const babel = require('gulp-babel');

const paths = {
  dest: {
    lib: 'lib',
    esm: 'esm',
    dist: 'dist',
  },
  styles: 'components/**/*.less',
  scripts: ['components/**/*.{ts,tsx}', '!components/**/demo/*.{ts,tsx}'],
};

function compileCJS() {
  const { dest, scripts } = paths;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(gulp.dest(dest.lib));
}

const build = gulp.parallel(compileCJS);

exports.build = build;

exports.default = build;
