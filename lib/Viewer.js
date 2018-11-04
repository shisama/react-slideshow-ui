"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = (0, _recompose.onlyUpdateForKeys)(['src', 'timestamp', 'imgClassName'])(function (_ref) {
  var styles = _ref.styles,
      src = _ref.src,
      onClickPrevButton = _ref.onClickPrevButton,
      onClickNextButton = _ref.onClickNextButton,
      timestamp = _ref.timestamp,
      imgClassName = _ref.imgClassName;
  var _src = src;

  if (timestamp) {
    _src += "?".concat(timestamp);
  }

  return React.createElement("div", {
    style: styles.IMAGE
  }, React.createElement("img", {
    className: imgClassName,
    src: _src,
    style: {
      width: '100%'
    }
  }), React.createElement("div", {
    onClick: onClickPrevButton,
    style: styles.PREV_ON_CONTENT
  }), React.createElement("div", {
    onClick: onClickNextButton,
    style: styles.NEXT_ON_CONTENT
  }));
});

exports.default = _default;