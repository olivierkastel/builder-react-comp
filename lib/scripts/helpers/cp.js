'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execCmd = execCmd;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function execCmd(cmd) {
  return new Promise(function (resolve, reject) {
    _child_process2.default.exec(cmd, function (err) {
      if (err) reject(err); // eslint-disable-line
      resolve();
    });
  });
}