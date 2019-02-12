/**
 * calculate progress
 * @param {number} page
 * @param {number} numberOfImages
 * @returns {number}
 */
const calcProgress = (page: number, numberOfImages: number): number => {
  const base = 100 / numberOfImages;
  const progress = Math.ceil(base * page);
  if (progress > 100) {
    return 100;
  }
  return progress;
};

const calcProgressIndex = (e: any, numberOfImages: number): number | void => {
  const parent = e.currentTarget.parentElement;
  if (!parent) {
    return;
  }
  const barWidth = parent.children[0].offsetWidth;
  const progressWidth =
    e.clientX - e.currentTarget.getBoundingClientRect().left;
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

export {calcProgress, calcProgressIndex};