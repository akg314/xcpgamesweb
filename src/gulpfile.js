var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var swPrecache = require('sw-precache');

gulp.task('generate-sw', function() {
  var swOptions = {
    //cache all files from the dist directory
    staticFileGlobs: [
      '../dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}',
      './*'
    ],
    stripPrefix: '.',
    runtimeCaching: [{
      urlPattern: /^https:\/\/xcp\.cards\/api/,
      //request trades data from API first, then fallback to cache
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'api-data'
        }
      }
    }]
  };
  //write service worker to root of website
  return swPrecache.write('../dist/service-worker.js', swOptions);
});

gulp.task('serve', ['generate-sw'], function() {
  browserSync({
    notify: false,
    logPrefix: 'weatherPWA',
    server: ['.'],
    open: false
  });
  gulp.watch([
    './*.html',
    './scripts/*.js',
    './styles/*.css',
    '!./service-worker.js',
    '!./gulpfile.js'
  ], ['generate-sw'], browserSync.reload);
});

gulp.task('default', ['serve']);
