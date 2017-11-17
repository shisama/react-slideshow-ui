'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var styles = props.styles,
      src = props.src,
      onClickPrevButton = props.onClickPrevButton,
      onClickNextButton = props.onClickNextButton,
      timestamp = props.timestamp,
      imgClassName = props.imgClassName;


  var _src = src;
  if (timestamp) {
    _src += '?' + timestamp;
  }

  return React.createElement(
    'div',
    { style: styles.IMAGE },
    React.createElement('img', { className: imgClassName, src: _src, style: { width: '100%' } }),
    React.createElement('div', { onClick: onClickPrevButton, style: styles.PREV_ON_CONTENT }),
    React.createElement('div', { onClick: onClickNextButton, style: styles.NEXT_ON_CONTENT })
  );
};

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }