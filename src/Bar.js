import * as React from 'react';

/**
 *
 * @param props
 * @return {XML}
 */
export default function(props) {
  const {
    styles,
    onClickPrevButton,
    onClickNextButton,
    currentPage,
    allPages,
    prevIcon,
    nextIcon,
    children,
  } = props;

  return (
    <div style={styles.BAR}>
      <div>
        <button onClick={onClickPrevButton} style={styles.BUTTON}>
          {prevIcon}
        </button>
        <span style={styles.PAGE_VIEW}>{`${currentPage} / ${allPages}`}</span>
        <button onClick={onClickNextButton} style={styles.BUTTON}>
          {nextIcon}
        </button>
      </div>
      {children}
    </div>
  );
}
