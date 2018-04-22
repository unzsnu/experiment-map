import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  sidepan: {
    zIndex: 10,
    backgroundColor: 'rgb(255,255,255,0.8)',
    top: 0,
    borderRight: '1px solid rgb(80%, 80%, 80%)',
    maxWidth: '35%',
    minWidth: '300px'
  }
});

export interface Props {
  children?: JSX.Element;
}

const SidepanContainer: React.StatelessComponent<Props> = ({ children }) => (
  <div id="sidebare" className={css(styles.sidepan)}>
    { children }
  </div>
);

export default SidepanContainer;
