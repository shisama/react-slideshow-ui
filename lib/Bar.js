'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _recompose = require('recompose');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _recompose.onlyUpdateForKeys)(['currentPage', 'allPages', 'children'])(function (_ref) {
  var styles = _ref.styles,
      onClickPrevButton = _ref.onClickPrevButton,
      onClickNextButton = _ref.onClickNextButton,
      currentPage = _ref.currentPage,
      allPages = _ref.allPages,
      prevIcon = _ref.prevIcon,
      nextIcon = _ref.nextIcon,
      children = _ref.children;

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
});