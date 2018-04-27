import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { MonumentDict, State as RootState} from '../reducers/index';
import MonumentItem from './monumentItem';
import Navigation from './navigation';

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
  center: number[];
  distanceBetweenPoints: (origin: any, current: any) => number;
}

export interface State {
  query: string;
  sort: string;
}

const selectToField = {
  Year: 'date_inscribed',
  Name: 'site',
  Country: 'location',
  Distance: 'distance'
};

const select = Object.keys(selectToField);


class SidepanList extends React.Component<Props, State> {

  public componentWillReceiveProps() {
    const origin = {"longitude" : this.props.center[0], "latitude": this.props.center[1] };
    this.props.filteredMonuments.map((k: any) =>
      this.props.monuments[k].distance = this.distanceBetweenPoints(origin,this.props.monuments[k])
    );
  }

  distanceBetweenPoints = function(origin: any, current: any) {
    return Math.abs(Math.sqrt((origin.latitude - current.latitude) * (origin.latitude - current.latitude) + (origin.longitude - current.longitude) * (origin.longitude - current.longitude)))
 }
  public state = {
    query: '',
    sort: selectToField[select[0]]
  };

  private onSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: target.value
    });
  };

  private onSelect = ({ target }: any) => {
    this.setState({
      sort: selectToField[target.value]
    });
  };

  public render() {
    const { filteredMonuments, onSelectItem, monuments, onMouseEnter, onMouseLeave } = this.props;
    const { query, sort } = this.state;

    // Array.from(this.props.filteredMonuments).forEach(function (monument) {
    //   monument.distance = distanceBetweenPoints({"latitude" : this.props.center[0], "longitude": this.props.center[1] },monument)

    const monumentsFiltered = filteredMonuments
      .map((k: string) => monuments[k])
      .filter(monument => monument.site.toLowerCase().includes(query))
      .sort((a, b) => a[sort] > b[sort] ? 1 : -1);

    return (
      <div className={css(styles.wrapper)}>
        <Navigation onSearch={this.onSearch} onSelect={this.onSelect} select={select}/>
        <div className={css(styles.list)}>
          {
            monumentsFiltered.map((monument, index) => (
              <MonumentItem
                monument={monument}
                key={index}
                distance={monument.distance}
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
