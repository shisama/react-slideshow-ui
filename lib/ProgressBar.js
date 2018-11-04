"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = (0, _recompose.onlyUpdateForKeys)(['progress'])(function (_ref) {
  var style = _ref.style,
      onClick = _ref.onClick,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      progress = _ref.progress;
  return React.createElement("div", {
    style: style,
    onClick: onClick,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave
  }, React.createElement("div", {
    style: {
      backgroundColor: '#007bb6',
      height: '100%',
      width: "".concat(progress, "%")
    }
  }));
});

exports.default = _default;