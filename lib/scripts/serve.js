'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _webpackPlayground = require('../config/webpack/webpack.playground.config');

var _webpackPlayground2 = _interopRequireDefault(_webpackPlayground);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This task builds and launches the node.js server.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This node.js server serves the application.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Even if the server rendering is disabled, the server serves the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * static website.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Then it launches browser-sync to proxy requests to the node.js server.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Browser-sync allows live reloading ONLY if a public ressource has changed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * For all other changes (like react components, component css, etc...),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * the webpackHotMiddleware reload the changing part of the app.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.default = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve) {
              var bundler = (0, _webpack2.default)(_webpackPlayground2.default);

              var wpMiddleware = (0, _webpackDevMiddleware2.default)(bundler, {
                publicPath: _webpackPlayground2.default.output.publicPath,
                stats: _webpackPlayground2.default.stats
              });
              var hotMiddlewares = (0, _webpackHotMiddleware2.default)(bundler);
              var doneOnce = false;
              var handleBundleComplete = function handleBundleComplete() {
                if (!doneOnce) {
                  var bs = _browserSync2.default.create();

                  var serverOptions = {
                    baseDir: './playground',

                    middleware: [wpMiddleware, hotMiddlewares]
                  };

                  bs.init({
                    server: serverOptions,
                    files: ['playground/**/*.css', 'playground/**/*.html']
                  }, resolve);
                  doneOnce = true;
                }
              };

              bundler.plugin('done', function () {
                return handleBundleComplete();
              });
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function start() {
    return ref.apply(this, arguments);
  }

  return start;
}();

module.exports = exports['default'];