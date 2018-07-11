const gulp = require('gulp');
const sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');


gulp.task('sass', function(){
    return gulp.src(['scss/*.scss'])
      .pipe(sass()).pipe(cleanCSS({compatibility: 'ie8', level: {
        1: {
          cleanupCharsets: true, // controls `@charset` moving to the front of a stylesheet; defaults to `true`
          normalizeUrls: false, // controls URL normalization; defaults to `true`
          optimizeBackground: true, // controls `background` property optimizations; defaults to `true`
          optimizeBorderRadius: true, // controls `border-radius` property optimizations; defaults to `true`
          optimizeFilter: true, // controls `filter` property optimizations; defaults to `true`
          optimizeFont: true, // controls `font` property optimizations; defaults to `true`
          optimizeFontWeight: true, // controls `font-weight` property optimizations; defaults to `true`
          optimizeOutline: true, // controls `outline` property optimizations; defaults to `true`
          removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
          removeNegativePaddings: true, // controls removing negative paddings; defaults to `true`
          removeQuotes: true, // controls removing quotes when unnecessary; defaults to `true`
          removeWhitespace: true, // controls removing unused whitespace; defaults to `true`
          replaceMultipleZeros: true, // contols removing redundant zeros; defaults to `true`
          replaceTimeUnits: true, // controls replacing time units with shorter values; defaults to `true`
          replaceZeroUnits: true, // controls replacing zero values with units; defaults to `true`
          roundingPrecision: false, // rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
          selectorsSortingMethod: 'standard', // denotes selector sorting method; can be `'natural'` or `'standard'`, `'none'`, or false (the last two since 4.1.0); defaults to `'standard'`
          specialComments: 'all', // denotes a number of /*! ... */ comments preserved; defaults to `all`
          tidyAtRules: true, // controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
          tidyBlockScopes: true, // controls block scopes (e.g. `@media`) optimizing; defaults to `true`
          tidySelectors: true, // controls selectors optimizing; defaults to `true`,
          transform: function () {} // defines a callback for fine-grained property optimization; defaults to no-op
        }
      }}))
      .pipe(gulp.dest("css"));
      
  });

  gulp.task('serve', ['sass'], function(){
  

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'], ['sass']);
    
  });


gulp.task('default', ['serve']);