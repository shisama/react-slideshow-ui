'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var style = props.style,
      onClick = props.onClick,
      onMouseMove = props.onMouseMove,
      onMouseLeave = props.onMouseLeave,
      progress = props.progress;


  return React.createElement(
    'div',
    {
      style: style,
      onClick: onClick,
      onMouseMove: onMouseMove,
      onMouseLeave: onMouseLeave
    },
    React.createElement('div', {
      style: {
        backgroundColor: '#007bb6',
        height: '100%',
        width: progress + '%'
      }
    })
  );
};

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }