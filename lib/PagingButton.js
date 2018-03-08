'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _recompose = require('recompose');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _recompose.pure)(function (_ref) {
  var onClick = _ref.onClick,
      children = _ref.children;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'button',
      { onClick: onClick, style: _styles2.default.BUTTON },
      children
    )
  );
});