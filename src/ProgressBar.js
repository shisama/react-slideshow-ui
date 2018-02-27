import * as React from 'react';
import {onlyUpdateForKeys} from 'recompose';

/**
 *
 * @param props
 * @return {XML}
 */
export default onlyUpdateForKeys(['progress'])(function({
  style,
  onClick,
  onMouseMove,
  onMouseLeave,
  progress,
}) {
  return (
    <div
      style={style}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          backgroundColor: '#007bb6',
          height: '100%',
          width: `${progress}%`,
        }}
      />
    </div>
  );
});
