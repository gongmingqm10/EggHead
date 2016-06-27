import React from 'react';

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

export default FilterItem;