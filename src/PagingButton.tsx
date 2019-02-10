import * as React from 'react';
import styles from './styles';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactNode,
};

const PagingButton = ({onClick, children}: Props) => {
  return (
    <React.Fragment>
      <button onClick={onClick} style={styles.BUTTON}>
        {children}
      </button>
    </React.Fragment>
  );
};

export default PagingButton;
