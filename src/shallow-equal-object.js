// @flow
/**
 * shallow equal
 * @param {Object} prevObj
 * @param {Object} nextObj
 * @private
 */
function shallowEqualObject(prevObj: Object, nextObj: Object) {
  const prevKeys: Array<string> = Object.keys(prevObj);
  const nextKeys: Array<string> = Object.keys(nextObj);
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
