"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shallowEqualObject(prevObj, nextObj) {
    const prevKeys = Object.keys(prevObj);
    const nextKeys = Object.keys(nextObj);
    if (prevKeys.length !== nextKeys.length) {
        return true;
    }
    for (const key of prevKeys) {
        const prev = prevObj[key];
        const next = nextObj[key];
        if (prev !== next) {
            return true;
        }
    }
    return false;
}
exports.default = shallowEqualObject;
