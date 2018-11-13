"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const recompose_1 = require("recompose");
const styles_1 = __importDefault(require("./styles"));
exports.default = recompose_1.pure(({ onClick, children }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: onClick, style: styles_1.default.BUTTON }, children)));
});
