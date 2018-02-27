import * as React from 'react';
import {onlyUpdateForKeys} from 'recompose';

/**
 *
 * @param props
 * @return {XML}
 */
export default onlyUpdateForKeys(['currentPage', 'allPages', 'children'])(
  function({
    styles,
    onClickPrevButton,
    onClickNextButton,
    currentPage,
    allPages,
    prevIcon,
    nextIcon,
    children,
  }) {
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
  },
);
