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
const PREVIEW = {
    position: 'absolute',
    zIndex: 1,
    bottom: 50,
    opacity: 0,
    left: '50%',
    marginLeft: -100,
    backgroundColor: '#323232',
    color: '#fff',
    border: '3px solid #323232',
    borderRadius: '3px',
};
exports.default = ({ images, imgClassName, isFullScreen, opacity, previewIndex, }) => {
    if (!images || images.length === 0) {
        return null;
    }
    const previews = images.map((img, index) => {
        const display = index === previewIndex ? 'inline' : 'none';
        const key = `preview-${index}`;
        return (React.createElement("img", { className: key, style: { display, width: 200 }, src: img, key: key }));
    });
    let fullscreenBottom = 120;
    const imgView = document.querySelector(imgClassName);
    if (imgView) {
        fullscreenBottom = window.screen.availHeight - imgView.offsetHeight + 30;
    }
    const bottom = isFullScreen ? fullscreenBottom : PREVIEW.bottom;
    const style = Object.assign({}, PREVIEW, {
        opacity,
        bottom,
    });
    return (React.createElement("div", { style: style },
        previews,
        React.createElement("p", { style: { margin: 0, textAlign: 'center', fontSize: 4 } }, `${previewIndex + 1} / ${images.length}`)));
};
