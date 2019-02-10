import * as React from 'react';

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactNode,
};

/**
 *
 * @param props
 * @return {XML}
 */
const FullscreenButton = ({
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

export default FullscreenButton;
