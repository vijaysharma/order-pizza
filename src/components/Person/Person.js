import React from 'react';
import CounterButton from '../../ui/CounterButton/CounterButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChild, faUser} from '@fortawesome/free-solid-svg-icons';
import * as classes from './Person.module.css';

const Person = props => {
  const label = props.label ? props.label.toUpperCase() : '';
  return (
    <div className={classes.Person}>
      <span><FontAwesomeIcon icon={props.label === 'adults' ? faUser : faChild} /></span>
      <h2>{label}</h2>
      <div>
        <CounterButton
          count={props.count}
          increment={props.onIncrement}
          decrement={props.onDecrement}
          disabled={props.disabled} />
      </div>
    </div>
  );
};

export default Person;