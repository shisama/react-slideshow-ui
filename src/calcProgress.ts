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

export default calcProgress;