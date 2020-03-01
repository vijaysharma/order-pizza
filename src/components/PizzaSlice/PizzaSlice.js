import React from 'react';
import PizzaPortion from '../../ui/PizzaPortion/PizzaPortion';
import CounterButton from '../../ui/CounterButton/CounterButton';
import * as classes from './PizzaSlice.module.css';

const PizzaSlice = props => {
  return (
    <div className={classes.PizzaSlice}>
      <PizzaPortion
        size={props.size}
        label={props.label} />
      <CounterButton
        count={props.count}
        increment={props.onIncrement}
        decrement={props.onDecrement}
        disabled={props.disabled} />
    </div>
  );
};

export default PizzaSlice;