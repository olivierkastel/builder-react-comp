'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _awesomeTypescriptLoader = require('awesome-typescript-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ROOT = process.cwd();

var DEBUG = !process.argv.includes('--release');
var ONBUILD_REACT_PERF = process.argv.includes('--react-perf');
var VERBOSE = process.argv.includes('--verbose');
var WATCH = process.argv.includes('serve');

var GLOBALS = {
  __ONBUILD_REACT_PERF__: ONBUILD_REACT_PERF || DEBUG,
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEVELOPMENT__: DEBUG,
  __PRODUCTION__: !DEBUG
};
var JS_LOADER = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  include: ROOT,
  loader: require.resolve('babel-loader'),
  query: {
    cacheDirectory: true
  }
};

var TS_LOADER = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  include: ROOT,
  loader: require.resolve('awesome-typescript-loader'),
  query: {
    useBabel: true,
    useCache: true
  }
};

var context = (0, _path.join)((0, _path.resolve)(ROOT), './playground');

// Common config. Used both for client and server.
var commonConfig = {
  context: context,

  output: {
    publicPath: '/public/'
  },

  resolve: {
    root: (0, _path.resolve)(ROOT),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx']
  },

  cache: DEBUG,
  debug: VERBOSE,
  verbose: VERBOSE,
  displayErrorDetails: VERBOSE,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  plugins: [new _webpack2.default.optimize.OccurenceOrderPlugin()],

  module: {
    loaders: [{
      test: /\.json$/,
      loader: require.resolve('json-loader')
    }, {
      test: /\.txt$/,
      loader: require.resolve('raw-loader')
    }, {
      test: /\.(jpg|png|gif|svg)$/,
      loader: require.resolve('url-loader') + '?limit=10240'
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: require.resolve('file-loader')
    }]
  }
};

// Client specific config. We merge the new config with the common config.
var playgroundConfig = Object.assign({}, commonConfig, {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  entry: {
    client: [].concat(_toConsumableArray(WATCH ? [require.resolve('webpack-hot-middleware/client')] : []), ['./clientEntry.tsx'])
  },

  output: _extends({}, commonConfig.output, {
    path: (0, _path.join)(ROOT, './playground'),
    filename: 'bundle.js'
  }),

  resolve: _extends({}, commonConfig.resolve),

  plugins: [].concat(_toConsumableArray(commonConfig.plugins), [new _webpack2.default.DefinePlugin(GLOBALS), new _awesomeTypescriptLoader.ForkCheckerPlugin()], _toConsumableArray(!DEBUG ? [new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
    compress: {
      warnings: VERBOSE
    }
  })] : []), _toConsumableArray(WATCH ? [new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin()] : [])),

  module: {
    loaders: [JS_LOADER, TS_LOADER].concat(_toConsumableArray(commonConfig.module.loaders))
  }
});

exports.default = playgroundConfig;
module.exports = exports['default'];