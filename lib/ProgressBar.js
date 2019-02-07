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
exports.default = ({ style, onClick, onMouseMove, onMouseLeave, progress, }) => {
    return (React.createElement("div", { style: style, onClick: onClick, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave },
        React.createElement("div", { style: {
                backgroundColor: '#007bb6',
                height: '100%',
                width: `${progress}%`,
            } })));
};
