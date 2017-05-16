'use strict';

var tsc = require('typescript');
var babel = require('babel-core');
var jestPreset = require('babel-preset-jest');

module.exports = {
  process: function process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      var transpiledTs = tsc.transpile(src, {
        module: tsc.ModuleKind.ES2015,
        jsx: tsc.JsxEmit.Preserve,
        target: tsc.ScriptTarget.ES2015
      }, path, []);

      var transpiledBabel = babel.transform(transpiledTs, {
        auxiliaryCommentBefore: ' istanbul ignore next ',
        filename: path,
        presets: [jestPreset],
        retainLines: true
      }).code;

      return transpiledBabel;
    }

    return src;
  }
};