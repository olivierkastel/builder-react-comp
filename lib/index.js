'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scripts = require('./scripts');

Object.defineProperty(exports, 'runner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_scripts).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }