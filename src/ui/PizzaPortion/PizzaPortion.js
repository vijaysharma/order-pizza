import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPizzaSlice} from '@fortawesome/free-solid-svg-icons';

import * as classes from './PizzaPortion.module.css';

const PizzaPortion = props => {
  let sliceClass = '';
  switch (props.size) {
    case 'small':
      sliceClass = classes.SmallSlice;
      break;
    case 'medium':
      sliceClass = classes.MediumSlice;
      break;
    case 'large':
      sliceClass = classes.LargeSlice;
      break;
    default:
      sliceClass = '';
  }
  const label = props.label ? props.label.toUpperCase() : '';
  return (
    <div className={classes.PizzaSlice}>
      <FontAwesomeIcon icon={faPizzaSlice} className={sliceClass} />
      <span>{label}</span>
    </div>
  );
};
PizzaPortion.defaultProps = {
  size: 'small',
  label: 'small'
};
PizzaPortion.propTypes = {
  size: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
export default PizzaPortion;