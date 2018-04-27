import * as React from 'react';
//import { StyleSheet, css } from 'aphrodite/no-important';


export interface Props {
  children?: JSX.Element;
}

const SidepanContainer: React.StatelessComponent<Props> = ({ children }) => (
  <div id="sidebar">
    { children }
  </div>
);

export default SidepanContainer;
