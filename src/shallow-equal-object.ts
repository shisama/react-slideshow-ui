/**
 * shallow equal
 * @param {Object} prevObj
 * @param {Object} nextObj
 * @private
 */
function shallowEqualObject(prevObj: {[key: string]: any}, nextObj: {[key: string]: any}) {
  const prevKeys: string[] = Object.keys(prevObj);
  const nextKeys: string[] = Object.keys(nextObj);
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

export default shallowEqualObject;
