import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PostifyCssPlugin from 'postifycss-loader/plugin';
import I18nPlugin from 'i18n-webpack-plugin';
import { kvs as i18n } from './i18n';

const WEBPACK_HOST = process.env.HOST || 'localhost'
const WEBPACK_PORT = process.env.PORT || 3002;

const PATHS = {
  SRC: path.resolve(__dirname, 'client'),
  SERVER: path.resolve(__dirname, 'server'),
  APP: path.resolve(__dirname, 'client', 'app'),
  STYLES: path.resolve(__dirname, 'client', 'styles'),
  STATICS: path.resolve(__dirname, 'statics'),
  LIBS: path.resolve(__dirname, 'statics', 'libs'),
  UTILS: path.resolve(__dirname, 'utils'),
  I18N: path.resolve(__dirname, 'i18n'),
  DIST: path.resolve(__dirname, 'dist'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  REACT_COMPONENTS: path.resolve(__dirname, 'client', 'components'),
  APP_MODULES: path.resolve(__dirname, 'client', 'modules'),
  RENDER_ENTRIES: path.resolve(__dirname, 'server', 'modules', 'render-entry.js'),
  PUBLIC: '/'
};
const APPS = [
  PATHS.APP
];

const DOMAIN_DEV = '//dev.xixi.io/';
const DOMAIN_STATICS = '//s.xixi.io/';
const DOMAIN = '//xixi.io/';

const AUTOPREFIXER_CONF = [
  '{browsers:["last 5 version"]}'
].join('&');
const SASS_LOADER_CONF = [
  `includePaths[]=${PATHS.SRC}`,
  `includePaths[]=${PATHS.STATICS}`
].join('&');
const extractTextConf = {
  remove: false,
  extract: true
};
const uglifyJsConf = {
  mangle: {
    except: ['$super', '$', 'exports', 'require']
  },
  compress: {
    warnings: false
  },
  sourceMap: true,
  output: {
    comments: false
  }
};
const targetNode = {
  console: true,
  global: true,
  process: true,
  Buffer: true,
  __filename: true,
  __dirname: true,
  setImmediate: true
};

const deDuplication = new webpack.optimize.DedupePlugin();
const noError = new webpack.NoErrorsPlugin();
const extractText = new ExtractTextPlugin('[name].css');
const uglifyJs = new webpack.optimize.UglifyJsPlugin(uglifyJsConf);

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin', '.DS_Store'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

function addEntryDevServer(entry) {
  _.keys(entry).forEach((_entry) => {
    entry[_entry].unshift(
      'webpack-dev-server/client?http://' + WEBPACK_HOST + ':' + WEBPACK_PORT,
      'webpack/hot/only-dev-server'
    );
  });
}
function makeStyleLoader(opts, isLocal) {
  const BASE_LOADER = `?importLoaders=${opts.dev ? 2 : 3}${isLocal ? '&modules&localIdentName=[name]__[local]___[hash:base64:5]' : ''}!autoprefixer?${AUTOPREFIXER_CONF}${opts.dev ? '' : '!postifycss'}!sass?${SASS_LOADER_CONF}`;
  const conf =  {
    test: /\.(css|scss)$/,
    loader: opts.dev ? `style!css${BASE_LOADER}` : opts.server ? `css/locals${BASE_LOADER}` : ExtractTextPlugin.extract('style', `css${BASE_LOADER}`/*, extractTextConf*/)
  };
  if (isLocal) {
    conf.include = APPS;
    conf.exclude = APPS.map(root => path.resolve(root, 'style.scss'));
  } else {
    conf.include = [PATHS.STYLES, PATHS.REACT_COMPONENTS].concat(APPS.map(root => path.resolve(root, 'style.scss')));
  }
  return conf;
}
function makeWebpackConf(conf = {}, lang, opts = {}) {
  const resolve = conf.resolve || (conf.resolve = {});
  const module = conf.module || (conf.module = {});
  const plugins = conf.plugins || (conf.plugins = []);
  module.loaders = module.loaders || (module.loaders = []);
  conf.devtool = conf.devtool || 'source-map'

  if (opts.common) plugins.push(new webpack.optimize.CommonsChunkPlugin(Object.assign({name: 'commons', minChunks: 3, filename: `[name].common.js`}, opts.common)));
  plugins.push(deDuplication, noError, new I18nPlugin(i18n[lang]));

  resolve.extensions = ['', '.js', '.jsx', 'css', 'scss'];
  resolve.modulesDirectories = ['node_modules'];
  resolve.alias = {
    libs: PATHS.LIBS,
    utils: PATHS.UTILS,
    assets: PATHS.STATICS,
    components: PATHS.REACT_COMPONENTS,
    styles: PATHS.STYLES
  };

  module.loaders.push({
    test: /\.jsx?$/,
    loaders: opts.dev ? ['react-hot', `babel`] : [`babel`],
    include: [PATHS.SRC, PATHS.UTILS, PATHS.I18N, PATHS.SERVER]
  }, makeStyleLoader(opts, false), makeStyleLoader(opts, true), {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpg)/,
    loader: 'url?limit=30000&name=[name]-[hash].[ext]'
  })

  conf.output = Object.assign({
    path: path.resolve(PATHS.DIST, lang),
    filename: `[name].bundle.js`,
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: `[name].chunk.js`,
    //publicPath: opts.dev ? PATHS.PUBLIC : DOMAIN_STATICS,
    publicPath: PATHS.PUBLIC,
    libraryTarget: 'umd'
  }, conf.output);

  if (opts.dev) {
    addEntryDevServer(conf.entry);
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(extractText, /*uglifyJs,*/ new PostifyCssPlugin({}));
  }
  opts.html && plugins.push(new HtmlWebpackPlugin(Object.assign({inject: 'body', hash: true}, opts.html)));
  conf.debug = !!opts.dev;

  return conf;
}

const I18N_KEYS = _.keys(i18n);
////////////////////////////////
/// webpack dev conf
const webpackDevConf = I18N_KEYS.map(lang => {
  const target = 'web';
  const entry = {
    app: [path.resolve(PATHS.APP, 'entry.js')]
  };
  const html = {
    title: 'Home',
    filename: `index.html`,
    template: path.resolve(PATHS.APP, 'tpl.html')
  };
  return makeWebpackConf({target, entry}, lang, {dev: true, common: {}, html});
});
///////////////////////////////////
const webpackDevServerConf = {
  contentBase: PATHS.DIST,
  publicPath: '/',
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true
  }
};

/////////////////////////////////
/// webpack prod conf
const webpackProdConf = I18N_KEYS.map(lang => {
  const target = 'web';
  const entry = {
    app: [path.resolve(PATHS.APP, 'entry.js')]
  };
  const html = {
    title: 'Home',
    filename: `index.html`,
    template: path.resolve(PATHS.APP, 'tpl.html')
  };
  return makeWebpackConf({ target, entry }, lang, { dev: false, html });
});

const webpackServerConf = I18N_KEYS.map(lang => {
  let conf = {
    target: 'node',
    entry: {
      routes: [PATHS.RENDER_ENTRIES]
    },
    externals: nodeModules,
    node: targetNode,
    plugins: [
      new webpack.DefinePlugin({
        __I18N_LANG__: JSON.stringify(lang)
      })
    ]
  };
  return makeWebpackConf(conf, lang, {dev: false, server: true});
});

export {
  WEBPACK_HOST, WEBPACK_PORT,
  webpackDevConf, webpackDevServerConf,
  webpackProdConf,
  webpackServerConf
};
