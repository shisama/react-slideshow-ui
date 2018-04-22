// @flow
import * as React from 'react';
import {pure} from 'recompose';
import styles from './styles';

type Props = {
  onClick: (e: Event) => void,
  children: React.Element<any>,
};

export default pure(function({onClick, children}: Props) {
  return (
    <React.Fragment>
      <button onClick={onClick} style={styles.BUTTON}>
        {children}
      </button>
    </React.Fragment>
  );
});
