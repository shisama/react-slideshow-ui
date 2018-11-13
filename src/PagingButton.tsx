import * as React from 'react';
import {pure} from 'recompose';
import styles from './styles';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactNode,
};

export default pure<Props>(({onClick, children}: Props) => {
  return (
    <React.Fragment>
      <button onClick={onClick} style={styles.BUTTON}>
        {children}
      </button>
    </React.Fragment>
  );
});
