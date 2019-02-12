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
exports.calcProgress = calcProgress;
const calcProgressIndex = (e, numberOfImages) => {
    const parent = e.currentTarget.parentElement;
    if (!parent) {
        return;
    }
    const barWidth = parent.children[0].offsetWidth;
    const progressWidth = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const clickPosition = Math.floor((progressWidth / barWidth) * 100);
    let nextIndex = 0;
    for (let i = 0; i < numberOfImages; i++) {
        const checkWidth = calcProgress(i, numberOfImages);
        if (clickPosition >= checkWidth) {
            nextIndex = i;
        }
    }
    return nextIndex;
};
exports.calcProgressIndex = calcProgressIndex;
