import * as React from 'react';
import {onlyUpdateForKeys} from 'recompose';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactNode,
};

/**
 *
 * @param props
 * @return {XML}
 */
export default ({
  onClick,
  children,
}: Props) => {
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
};
