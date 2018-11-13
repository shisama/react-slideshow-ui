"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const recompose_1 = require("recompose");
exports.default = recompose_1.onlyUpdateForKeys(['src', 'timestamp', 'imgClassName'])(({ styles, src, onClickPrevButton, onClickNextButton, timestamp, imgClassName, }) => {
    let _src = src;
    if (timestamp) {
        _src += `?${timestamp}`;
    }
    return (React.createElement("div", { style: styles.IMAGE },
        React.createElement("img", { className: imgClassName, src: _src, style: { width: '100%' } }),
        React.createElement("div", { onClick: onClickPrevButton, style: styles.PREV_ON_CONTENT }),
        React.createElement("div", { onClick: onClickNextButton, style: styles.NEXT_ON_CONTENT })));
});
