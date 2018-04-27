import * as React from 'react';
import { MapEvent } from 'react-mapbox-gl/lib/map-events';
import { throttle } from 'lodash';
import { connect } from 'react-redux';
import { getMonuments } from '../actions/monument';
import { MonumentDict, State } from '../reducers/index';
import UnescoMap from './map';
import { css, StyleSheet } from 'aphrodite/no-important';
import { browserHistory, RouteComponentProps } from 'react-router';
import { Props as SidepanListProps } from './sidepanList';
import { RouteProps } from './sidepanDetail';
import SidepanContainer from './sidepanContainer';
import { fetchMonument } from '../actions/monument';

interface Props {
  getMonuments: (boundsArr: number[]) => any;
  filteredMonuments: string[];
  monuments: MonumentDict;
  fetchMonument: (id: string) => any;
}

interface StateComp {
  bounds: number[];
  filteredMonuments: string[];
  hoveredItem: string;
  center: number[];
  zoom: [number];
  hoveredAnchor: string;
  query: string;
  sort: string;
  isSideOpen: boolean;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    zIndex: 1,
  }
});

const defaultZoom: [number] = [9];
const defaultCenter = [9.285289,45.605151];

const selectToField = {
  Year: 'date_inscribed',
  Name: 'site',
  Country: 'location'
};

const select = Object.keys(selectToField);

class Main extends React.Component<Props & RouteComponentProps<RouteProps, void>, StateComp> {
  public state = {
    hoveredItem: '',
    zoom: defaultZoom,
    center: defaultCenter,
    filteredMonuments: [],
    bounds: [],
    hoveredAnchor: 'top',
    query: '',
    sort: selectToField[select[0]],
    isSideOpen: true,
  };

  public componentWillMount() {
    const { location, fetchMonument, params } = this.props;

    if (location.pathname.includes('detail')) {
      fetchMonument(params.id).then(() => {
        this.setState({
          center: this.props.monuments[params.id].latlng as [number, number],
          zoom: [11],
          hoveredItem: params.id
        });
      });
    }

    browserHistory.listen((ev) => {
      if (!ev.pathname.includes('detail')) {
        this.setState({
          zoom: defaultZoom,
          hoveredItem: ''
        });
      }
    });
  }

  private mapInit: MapEvent = (map: any) => {
    const bounds = map.getBounds();
    const boundsArr = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()];

    this.props.getMonuments(boundsArr).then(() => {
      this.setMonumentsAndBounds(boundsArr);
    });
  };

  private setMonumentsAndBounds = (bounds: number[]) => {
    const { monuments } = this.props;

    this.setState({
      filteredMonuments: Object.keys(monuments).filter(k => {
        const lat = monuments[k].latitude;
        const long = monuments[k].longitude;

        return lat > bounds[0] && long > bounds[1] && lat < bounds[2] && long < bounds[3];
      }),
      bounds
    });
  };

  private BoundsChanged: MapEvent = throttle((map: any) => {
    const bounds = map.getBounds();
    const limitedBounds = map.unproject([60, 60]);

    const hDiff = Math.abs(bounds.getNorth() - limitedBounds.lat);
    const vDiff = Math.abs(bounds.getWest() - limitedBounds.lng);

    const boundsArr = [bounds.getSouth() + hDiff, limitedBounds.lng, limitedBounds.lat, bounds.getEast() - vDiff];

    //this.setMonumentsAndBounds(boundsArr);
    this.props.getMonuments(boundsArr).then(() => {
      this.setMonumentsAndBounds(boundsArr);
    });
  }, 2000, { leading: true });

  private onMouseEnter = (k: string) => {
    this.setState({
      hoveredItem: k
    });

  }

  private onMouseLeave = () => {
    this.setState({
      hoveredItem: ''
    });
  }

  private onListMouseEnter = (k: string) => {
    const selectedMonument = this.props.monuments[k];
    this.setState({
      hoveredItem: k,
      center: selectedMonument.latlng,
      zoom: [11]
    });

  }

  private onListMouseLeave = () => {
    this.setState({
      hoveredItem: '',
      zoom: defaultZoom
    });
  }

  private onMonumentClick = (k: string) => {
    const selectedMonument = this.props.monuments[k];

    this.setState({
      center: selectedMonument.latlng,
      zoom: [11]
    });

    this.props.fetchMonument(k);

    setTimeout(() => {
      browserHistory.replace(`/detail/${k}`);
    }, 500);
  };
  private onClick = ({ target }: any) => {
    this.setState({
      isSideOpen: !this.state.isSideOpen
    });
  };
  public render() {
    const { monuments, children} = this.props;
    const { zoom, center, hoveredItem, filteredMonuments, isSideOpen} = this.state;

    return (
      <div id="main" className={css(styles.container) + (isSideOpen ? ' side__open' : '')}>
      <button id="close" onClick={this.onClick.bind(this)}>
        <svg width="12" height="17" viewBox="0 0 12 17">
          <path
            d="M10.071 1L3 8.071l7.071 7.071"
            strokeWidth="3"
            stroke="#394C5B"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <span>{isSideOpen ? 'Chiudi' : 'Apri'} la sidebar</span>
      </button>
        <SidepanContainer>
        {
          React.cloneElement((children as React.ReactElement<SidepanListProps>), {
            onMouseEnter: this.onListMouseEnter,
            onMouseLeave: this.onListMouseLeave,
            filteredMonuments: filteredMonuments as string[],
            onSelectItem: this.onMonumentClick,
            center: this.state.center
          })
        }
        </SidepanContainer>
        <UnescoMap
          zoom={zoom}
          center={center}
          hoveredItem={hoveredItem}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          monuments={monuments}
          BoundsChanged={this.BoundsChanged}
          mapInit={this.mapInit}
          onMonumentClick={this.onMonumentClick}
        />
      </div>
    );
  }
}

export default connect((state: State) => ({
  monuments: state.monuments
}), dispatch => ({
  getMonuments: (boundsArr: number[]) => dispatch(getMonuments(boundsArr)),
  fetchMonument: (id: string) => dispatch(fetchMonument(id))
}))(Main);
