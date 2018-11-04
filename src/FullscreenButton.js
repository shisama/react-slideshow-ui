// @flow
import * as React from 'react';
import {onlyUpdateForKeys} from 'recompose';

type Props = {
  onClick: (e: Event) => void,
  children: React.Element<any>,
};

/**
 *
 * @param props
 * @return {XML}
 */
export default onlyUpdateForKeys<Props>(['children'])(function({
  onClick,
  children,
}: Props) {
  return (
    <div>
      <button
        style={{
          backgroundColor: 'transparent',
          borderStyle: 'none',
          position: 'absolute',
          right: 10,
          top: 5,
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
});
