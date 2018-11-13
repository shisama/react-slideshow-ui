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
exports.default = recompose_1.onlyUpdateForKeys(['children'])(({ onClick, children, }) => {
    return (React.createElement("div", null,
        React.createElement("button", { style: {
                backgroundColor: 'transparent',
                borderStyle: 'none',
                position: 'absolute',
                right: 10,
                top: 5,
            }, onClick: onClick }, children)));
});
