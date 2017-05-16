import { join, resolve } from 'path';
import webpack from 'webpack';
import { ForkCheckerPlugin } from 'awesome-typescript-loader';

const ROOT = process.cwd();

const DEBUG = !process.argv.includes('--release');
const ONBUILD_REACT_PERF = process.argv.includes('--react-perf');
const VERBOSE = process.argv.includes('--verbose');
const WATCH = process.argv.includes('serve');

const GLOBALS = {
  __ONBUILD_REACT_PERF__: ONBUILD_REACT_PERF || DEBUG,
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEVELOPMENT__: DEBUG,
  __PRODUCTION__: !DEBUG,
};
const JS_LOADER = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  include: ROOT,
  loader: require.resolve('babel-loader'),
  query: {
    cacheDirectory: true,
  },
};

const TS_LOADER = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  include: ROOT,
  loader: require.resolve('awesome-typescript-loader'),
  query: {
    useBabel: true,
    useCache: true,
  },
};

const context = join(resolve(ROOT), './playground');

// Common config. Used both for client and server.
const commonConfig = {
  context,

  output: {
    publicPath: '/public/',
  },

  resolve: {
    root: resolve(ROOT),
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx'],
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
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: require.resolve('json-loader'),
      }, {
        test: /\.txt$/,
        loader: require.resolve('raw-loader'),
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: `${require.resolve('url-loader')}?limit=10240`,
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: require.resolve('file-loader'),
      },
    ],
  },
};

// Client specific config. We merge the new config with the common config.
const playgroundConfig = Object.assign({}, commonConfig, {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  entry: {
    client: [
      ...(WATCH ? [require.resolve('webpack-hot-middleware/client')] : []),
      './clientEntry.tsx',
    ],
  },

  output: {
    ...commonConfig.output,
    path: join(ROOT, './playground'),
    filename: 'bundle.js',
  },

  resolve: {
    ...commonConfig.resolve,
  },

  plugins: [
    ...commonConfig.plugins,
    new webpack.DefinePlugin(GLOBALS),
    new ForkCheckerPlugin(),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: VERBOSE,
        },
      }),
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
  ],

  module: {
    loaders: [
      JS_LOADER,
      TS_LOADER,
      ...commonConfig.module.loaders,
    ],
  },
});

export default playgroundConfig;
