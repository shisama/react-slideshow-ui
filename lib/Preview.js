'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _recompose = require('recompose');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PREVIEW = {
  position: 'absolute',
  zIndex: 1,
  bottom: 50,
  opacity: 0,
  left: '50%',
  marginLeft: -100,
  backgroundColor: '#323232',
  color: '#fff',
  border: '3px solid #323232',
  borderRadius: '3px'
};

exports.default = (0, _recompose.pure)(function (_ref) {
  var images = _ref.images,
      imgClassName = _ref.imgClassName,
      isFullScreen = _ref.isFullScreen,
      opacity = _ref.opacity,
      previewIndex = _ref.previewIndex;

  if (!images || images.length === 0) {
    return null;
  }
  var previews = images.map(function (img, index) {
    var display = index === previewIndex ? 'inline' : 'none';
    var key = 'preview-' + index;
    return React.createElement('img', {
      className: key,
      style: { display: display, width: 200 },
      src: img,
      key: key
    });
  });

  var fullscreenBottom = 120;
  var imgView = document.querySelector(imgClassName);
  if (imgView) {
    fullscreenBottom = window.screen.availHeight - imgView.offsetHeight + 30;
  }
  var bottom = isFullScreen ? fullscreenBottom : PREVIEW.bottom;
  var style = _extends({}, PREVIEW, {
    opacity: opacity,
    bottom: bottom
  });
  return React.createElement(
    'div',
    { style: style },
    previews,
    React.createElement(
      'p',
      { style: { margin: 0, textAlign: 'center', fontSize: 4 } },
      previewIndex + 1 + ' / ' + images.length
    )
  );
});