// @flow
import * as React from 'react';
import {onlyUpdateForKeys} from 'recompose';

type Props = {
  style: Object,
  onClick: (e: MouseEvent) => void,
  onMouseMove: (e: MouseEvent) => void,
  onMouseLeave: (e: MouseEvent) => void,
  progress: number,
};

/**
 *
 * @param props
 * @return {XML}
 */
export default onlyUpdateForKeys<Props>(['progress'])(function({
  style,
  onClick,
  onMouseMove,
  onMouseLeave,
  progress,
}: Props) {
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
