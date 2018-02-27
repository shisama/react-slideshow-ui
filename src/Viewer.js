import * as React from 'react';
import {onlyUpdateForKeys} from 'recompose';

/**
 *
 * @param props
 * @return {XML}
 */
export default onlyUpdateForKeys(['src', 'timestamp', 'imgClassName'])(
  function({
    styles,
    src,
    onClickPrevButton,
    onClickNextButton,
    timestamp,
    imgClassName,
  }) {
    let _src = src;
    if (timestamp) {
      _src += `?${timestamp}`;
    }

    return (
      <div style={styles.IMAGE}>
        <img className={imgClassName} src={_src} style={{width: '100%'}} />
        <div onClick={onClickPrevButton} style={styles.PREV_ON_CONTENT} />
        <div onClick={onClickNextButton} style={styles.NEXT_ON_CONTENT} />
      </div>
    );
  },
);
