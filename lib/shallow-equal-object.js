"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function shallowEqualObject(prevObj, nextObj) {
  var prevKeys = Object.keys(prevObj);
  var nextKeys = Object.keys(nextObj);

  if (prevKeys.length !== nextKeys.length) {
    return true;
  }

  for (var _i = 0; _i < prevKeys.length; _i++) {
    var key = prevKeys[_i];
    var prev = prevObj[key];
    var next = nextObj[key];

    if (prev !== next) {
      return true;
    }
  }

  return false;
}

var _default = shallowEqualObject;
exports.default = _default;