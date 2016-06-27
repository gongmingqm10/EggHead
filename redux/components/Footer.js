import React from 'react';
import FilterItem from './FilterItem';

const filters = [
  {text: 'All', filter: 'SHOW_ALL'},
  {text: 'Completed', filter: 'SHOW_COMPLETED'},
  {text: 'Active', filter: 'SHOW_UNCOMPLETED'}
];

class Footer extends React.Component {
  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {store} = this.context;
    const {visibilityFilter} = store.getState();
    return (
      <div style={styles.filterContainer}>
        Show: {filters.map(item =>
        <FilterItem
          {...item}
          key={item.filter}
          onClick={() => store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: item.filter})}
          selected={visibilityFilter === item.filter}
        />
      )}
      </div>
    )
  }
}

const styles = {
  filterContainer: {
    flexDirection: 'row'
  }
};

Footer.contextTypes = {
  store: React.PropTypes.object
};

export default Footer;
