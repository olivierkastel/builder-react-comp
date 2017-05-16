'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _fs = require('./helpers/fs');

var _cp = require('./helpers/cp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var ROOT = process.cwd();

var npmPackageFile = 'package.json';

exports.default = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var npmPackage, nextVersion, packageData, newPackageData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            npmPackage = require(ROOT + '/package.json');
            nextVersion = void 0;

            if (_semver2.default.valid(process.argv[3])) {
              nextVersion = process.argv[3];
            } else {
              nextVersion = _semver2.default.inc(npmPackage.version, process.argv[3], process.argv[4]);
            }

            if (!process.argv[2]) {
              console.log('Missing version. Aborting.'); // eslint-disable-line
              process.exit(-1);
            }

            /* eslint-disable */
            console.log('\n    Creating a new version.\n    Current version: ' + npmPackage.version + '\n    Next version: ' + nextVersion + '\n  ');
            /* eslint-enable */

            console.log('Starting new Gitflow release'); // eslint-disable-line
            _context.next = 8;
            return (0, _cp.execCmd)('git flow release start ' + nextVersion);

          case 8:
            console.log('Gitflow release created'); // eslint-disable-line

            console.log('ShrinkWrap package'); // eslint-disable-line
            _context.next = 12;
            return (0, _cp.execCmd)('npm shrinkwrap');

          case 12:
            // eslint-disable-line
            console.log('ShrinkWrap done'); // eslint-disable-line

            console.log('Bumping package.json'); // eslint-disable-line

            _context.next = 16;
            return (0, _fs.readFile)(npmPackageFile);

          case 16:
            packageData = _context.sent;
            newPackageData = packageData.replace(/.version.*$/m, '"version": "' + nextVersion + '",');
            _context.next = 20;
            return (0, _fs.writeFile)(npmPackageFile, newPackageData);

          case 20:
            console.log('package.json bumped'); // eslint-disable-line

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function release() {
    return ref.apply(this, arguments);
  }

  return release;
}();

module.exports = exports['default'];