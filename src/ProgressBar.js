// eslint-disable-next-line no-unused-vars
import * as React from 'react';

/**
 *
 * @param props
 * @return {XML}
 */
export default function(props) {
  const {style, onClick, onMouseMove, onMouseLeave, progress} = props;

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
}
