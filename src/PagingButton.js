import * as React from 'react';
import {pure} from 'recompose';
import styles from './styles';

export default pure(function({
  onClick,
  children
}) {
  return (
    <React.Fragment>
      <button onClick={onClick} style={styles.BUTTON}>
        {children}
      </button>
    </React.Fragment>
  );
});