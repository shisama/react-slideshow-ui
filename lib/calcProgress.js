"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calcProgress = (page, numberOfImages) => {
    const base = 100 / numberOfImages;
    const progress = Math.ceil(base * page);
    if (progress > 100) {
        return 100;
    }
    return progress;
};
exports.default = calcProgress;
