import React, {useState} from 'react';
import PizzaSlice from '../../components/PizzaSlice/PizzaSlice';
import Person from '../../components/Person/Person';
import * as classes from './OrderTable.module.css';
import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux';

const OrderTable = props => {

  const PizzaSlices = Object.keys(props.pizzaState).map(pizzaSize => (
      <PizzaSlice
        key={pizzaSize}
        size={pizzaSize}
        label={pizzaSize}
        count={props.pizzaState[pizzaSize]}
        onIncrement={() => props.incrementPizzaHandler(pizzaSize)}
        onDecrement={() => props.decrementPizzaHandler(pizzaSize)}
        disabled={!props.pizzaState[pizzaSize]} />
    )
  );

  const Persons = Object.keys(props.personState).map(person => (
      <Person
        key={person}
        label={person}
        count={props.personState[person]}
        onIncrement={() => props.incrementPersonHandler(person)}
        onDecrement={() => props.decrementPersonHandler(person)}
        disabled={!props.personState[person]} />
    )
  );

  return (
    <div className={classes.OrderTableWrapper}>
      <h1 className={classes.OrderTitle}>Order <span>Pizza</span></h1>
      <div className={classes.OrderTable}>
        {PizzaSlices}
        {Persons}
      </div>
      <div className={classes.OrderTotal}>
        <h4 className={classes.OrderTitle}>Order <span>Total</span></h4><span>{props.totalPrice}</span>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    pizzaState: state.pizza,
    personState: state.person,
    totalPrice: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    incrementPizzaHandler: (pizzaSize) => dispatch({type: actionTypes.INC_PIZZA, label: pizzaSize}),
    decrementPizzaHandler: (pizzaSize) => dispatch({type: actionTypes.DEC_PIZZA, label: pizzaSize}),
    incrementPersonHandler: (person) => dispatch({type: actionTypes.INC_PERSON, label: person}),
    decrementPersonHandler: (person) => dispatch({type: actionTypes.DEC_PERSON, label: person}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderTable);