import React, {PropTypes} from 'react';

const FilterItem = ({selected, onClick, text}) => (
  <span
    style={{
      cursor: 'pointer',
      marginRight: 8,
      textDecoration: selected ? 'none':'underline',
      color: selected ? 'black':'blue'}}
    onClick={onClick} >
    {text}
  </span>
);

FilterItem.propTypes = {
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.func.isRequired
};

export default FilterItem;