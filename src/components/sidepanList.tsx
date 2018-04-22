import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { MonumentDict, State as RootState} from '../reducers/index';
import MonumentItem from './monumentItem';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    height: '100vh',
    width: '100%'
  },
  list: {
    overflow: 'auto',
    maxHeight: '94vh'
  }
});

export interface Props {
  filteredMonuments: string[];
  monuments: MonumentDict;
  onSelectItem: (key: string) => void;
  onMouseEnter: (key: string) => void;
  onMouseLeave: () => void;
}

export interface State {
  query: string;
  sort: string;
  isSideOpen: boolean;
}

const selectToField = {
  Year: 'date_inscribed',
  Name: 'site',
  Country: 'location'
};

const select = Object.keys(selectToField);

class SidepanList extends React.Component<Props, State> {

  public state = {
    query: '',
    sort: selectToField[select[0]],
    isSideOpen: true
  };
 
  private onClick = ({ target }: any) => {
    this.setState({
      isSideOpen: !this.state.isSideOpen
    });
  };

  public render() {
    const { filteredMonuments, onSelectItem, monuments, onMouseEnter, onMouseLeave } = this.props;
    const { query, sort, isSideOpen} = this.state;

    const monumentsFiltered = filteredMonuments
      .map((k: string) => monuments[k])
      .filter(monument => monument.site.toLowerCase().includes(query))
      .sort((a, b) => a[sort] > b[sort] ? 1 : -1);
    //const sideopen = this.state.sideopen;

    return (
      <div className={css(styles.wrapper) + (isSideOpen ? ' active' : '')}>
        <button id="close" onClick={this.onClick.bind(this)}>X</button>
        <div className={css(styles.list)}>
          {
            monumentsFiltered.map((monument, index) => (
              <MonumentItem
                monument={monument}
                key={index}
                onClick={() => onSelectItem(monument.id)}
                onMouseEnter={() => onMouseEnter(monument.id)}
                onMouseLeave={() => onMouseLeave()}/>
            ))
          }
        </div>
      </div>
    );
  }
};

export default connect((state: RootState) => ({
  monuments: state.monuments
}))(SidepanList);
