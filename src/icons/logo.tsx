// tslint:disable
import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

// const translateKeyframes = {
//     '0%': {
//         transform: 'rotate(0deg)',
//     },
 
//     '50%': {
//         transform: 'rotate(180deg)',
//     },
 
//     '100%': {
//         transform: 'rotate(360deg)',
//     }
// };

const styles = StyleSheet.create({
  rhlogo : {
      // animationName: translateKeyframes,
      // animationDuration: '3s',
      // animationIterationCount: 'infinite',
  }
});

const Logo: React.StatelessComponent<any> = () => (
    <svg id={css(styles.rhlogo)} width="40px" height="40px" viewBox="0 0 576.469 576.469">
    <g>
        <g>
            <path d="M275.762,95.253v38.955l116.228-67.104L275.762,0v39.283c-69.728,2.266-134.601,34.249-178.988,88.56l43.305,35.392    C173.798,121.976,222.893,97.493,275.762,95.253z" fill="#786d78"/>
            <path d="M537.185,275.761c-2.268-69.73-34.25-134.602-88.562-178.989l-35.391,43.305c41.258,33.719,65.74,82.814,67.979,135.684    h-38.951l67.104,116.228l67.105-116.228H537.185z" fill="#786d78"/>
            <path d="M300.706,481.211V442.26l-116.227,67.104l116.227,67.105v-39.285c69.73-2.268,134.604-34.25,178.988-88.562L436.39,413.23    C402.671,454.488,353.575,478.971,300.706,481.211z" fill="#786d78"/>
            <path d="M95.255,300.705h38.953L67.106,184.477L0.001,300.705h39.284c2.267,69.729,34.249,134.604,88.56,178.988l35.392-43.305    C121.978,402.67,97.495,353.574,95.255,300.705z" fill="#786d78"/>
        </g>
    </g>
    </svg>
);

export default Logo;
