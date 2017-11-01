'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var styles = props.styles,
      onClickPrevButton = props.onClickPrevButton,
      onClickNextButton = props.onClickNextButton,
      currentPage = props.currentPage,
      allPages = props.allPages,
      prevIcon = props.prevIcon,
      nextIcon = props.nextIcon,
      children = props.children;


  return React.createElement(
    'div',
    { style: styles.BAR },
    React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: onClickPrevButton, style: styles.BUTTON },
        prevIcon
      ),
      React.createElement(
        'span',
        { style: styles.PAGE_VIEW },
        currentPage + ' / ' + allPages
      ),
      React.createElement(
        'button',
        { onClick: onClickNextButton, style: styles.BUTTON },
        nextIcon
      )
    ),
    children
  );
};

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }