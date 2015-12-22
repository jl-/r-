import gulp from 'gulp';
import run from 'run-sequence';
import del from 'del';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {
  WEBPACK_HOST, WEBPACK_PORT,
  webpackDevConf, webpackDevServerConf,
  webpackProdConf,
  webpackServerConf
} from './webpack.conf';

// pathes config
const CONF = {
  DIST: 'dist'
};

gulp.task('clean', cb => del(CONF.DIST + '*', cb));
gulp.task('statics', () => {
  return gulp.src('statics/**/*')
    .pipe(gulp.dest(CONF.DIST + '/statics'));
});

gulp.task('watch', () => {
  gulp.watch('statics/**/*', ['statics']);
});
gulp.task('wp:dev', (cb) => {
  let webpackDevServer = new WebpackDevServer(webpack(webpackDevConf), webpackDevServerConf);
  webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, (err, result) => {
    console.log(err || 'Listening at %s:%s', WEBPACK_HOST, WEBPACK_PORT);
    cb();
  });
});
gulp.task('wp:prod', (cb) => {
  webpack(webpackProdConf, function(err, stats) {
    cb();
  });
});
gulp.task('wp:serve', (cb) => {
  webpack(webpackServerConf, function(err, stats) {
    err && console.log(err);
    cb();
  });
});


gulp.task('dev', (cb) => {
  run('clean', 'statics', 'watch', 'wp:dev');
});
gulp.task('prod', (cb) => {
  run('clean', 'statics', 'wp:prod');
});
gulp.task('serve', (cb) => {
  run('clean', 'statics', 'wp:prod', 'wp:serve');
});
