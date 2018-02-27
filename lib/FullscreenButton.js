'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _recompose = require('recompose');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _recompose.onlyUpdateForKeys)(['children'])(function (props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        style: {
          backgroundColor: 'transparent',
          borderStyle: 'none',
          position: 'absolute',
          right: 10,
          top: 5
        },
        onClick: props.onClick
      },
      props.children
    )
  );
});