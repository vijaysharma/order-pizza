import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import * as classes from './CounterButton.module.css';

const CounterButton = props => (
  <div className={classes.CounterButton}>
    <FontAwesomeIcon icon={faMinusCircle} onClick={props.decrement} className={[props.disabled ? classes.DecrementDisabled : '', classes.Decrement].join(' ')} />
    <span>{props.count}</span>
    <FontAwesomeIcon icon={faPlusCircle} onClick={props.increment} className={classes.Increment} />
  </div>
);


export default CounterButton;