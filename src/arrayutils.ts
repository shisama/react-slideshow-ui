const isEmptyArray = (arr?: string[] | null): boolean => {
  return arr === undefined || arr === null || arr.length === 0;
};

export { isEmptyArray };
