import * as React from 'react';
import { Monument } from '../reducers/index';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../style';

export interface Props {
  monument: Monument;
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
  onClick: React.MouseEventHandler<HTMLElement>;
  distance: Monument["distance"];
}

const styles = StyleSheet.create({
  flag: {
    flex: 1
  },
  description: {
    flex: 8
  },
  second: {
    color: colors.grey,
    fontWeight: 300,
    marginTop: 6,
    lineHeight: '16px'
  },
  state: {
    fontSize: 10,
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '5 px',
    color: '#808492'
  },
  image: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10
  }
});

const MonumentItem: React.StatelessComponent<Props> = ({ monument, onMouseEnter, onMouseLeave, onClick, distance }) => (
  <div
    className="container"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
    {
      (monument as any).countryIso && (
        <div className={css(styles.flag)}/>
      )
    }
    <div className={css(styles.description)}>
      <h1 dangerouslySetInnerHTML={{__html: monument.site}}></h1>
      <div className={css(styles.second)}>
        <span className={css(styles.state)}>{ monument.states }</span>
        <span> | { monument.date_inscribed } | dist: { distance }</span>
      </div>
    </div>
    <div className={css(styles.image)}>
      <img src={monument.image_url}/>
    </div>
  </div>
);

export default MonumentItem;
