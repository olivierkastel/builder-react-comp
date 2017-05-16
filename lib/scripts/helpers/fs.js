'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = readFile;
exports.writeFile = writeFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFile(src) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(src, 'utf8', function (readErr, data) {
      if (readErr) reject(readErr);
      resolve(data);
    });
  });
}

function writeFile(src, data) {
  return new Promise(function (resolve, reject) {
    _fs2.default.writeFile(src, data, 'utf8', function (writeErr) {
      if (writeErr) reject(writeErr);
      resolve();
    });
  });
}