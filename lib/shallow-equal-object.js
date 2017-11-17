"use strict";

function shallowEqualObject(prevObj, nextObj) {
  var prevKeys = Object.keys(prevObj);
  var nextKeys = Object.keys(nextObj);
  if (prevKeys.length !== nextKeys.length) {
    return true;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = prevKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      var prev = prevObj[key];
      var next = nextObj[key];
      if (prev !== next) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

module.exports = shallowEqualObject;