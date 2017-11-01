// eslint-disable-next-line no-unused-vars
import * as React from 'react';

/**
 *
 * @param props
 * @return {XML}
 */
export default function(props) {
  const {
    styles,
    src,
    onClickPrevButton,
    onClickNextButton,
    timestamp,
    imgClassName,
  } = props;

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
}
