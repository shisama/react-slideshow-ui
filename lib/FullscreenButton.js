"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var _default = (0, _recompose.onlyUpdateForKeys)(['children'])(function (_ref) {
  var onClick = _ref.onClick,
      children = _ref.children;
  return React.createElement("div", null, React.createElement("button", {
    style: {
      backgroundColor: 'transparent',
      borderStyle: 'none',
      position: 'absolute',
      right: 10,
      top: 5
    },
    onClick: onClick
  }, children));
});

exports.default = _default;