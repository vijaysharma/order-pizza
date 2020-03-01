import React, {useState} from 'react';
import PizzaSlice from '../../components/PizzaSlice/PizzaSlice';
import Person from '../../components/Person/Person';
import * as classes from './OrderTable.module.css';

const OrderTable = () => {
  const PRICE = {
    small: 150,
    medium: 200,
    large: 300
  };
  const [pizzaState, setPizzaState] = useState({small: 0, medium: 1, large: 0});
  const [personState, setPersonState] = useState({adults: 1, children: 0});
  const [totalPrice, setTotalPrice] = useState(200);

  const calculateTotalPrice = (state, price) => {
    const totalPrice = Object.keys(state).reduce((total, key) => {
      return total + state[key] * price[key];
    }, 0);
    return totalPrice;
  };
  const getTotalSmall = (state) => {
    const stateCopy = {...state};
    return stateCopy.large * 4 + stateCopy.medium * 2 + stateCopy.small;
  };

  const pizzaBoundary = (newState) => {
    let newStateCopy = {...newState};
    const newTotalSmalls = getTotalSmall(newStateCopy);
    if (newTotalSmalls < 2) {
      newStateCopy.medium = 1;
    }
    return newStateCopy;
  };

  const pizzaBestCombination = (state) => {
    const totalSmalls = getTotalSmall(state);
    const large = Math.floor(totalSmalls / 4);
    const medium = Math.floor((totalSmalls - large * 4) / 2);
    const small = (totalSmalls - large * 4 - medium * 2);

    return {small, medium, large};
  };

  const changePersonStateOnPizza = (pizzas, persons) => {
    const copyPizzas = {...pizzas};
    const copyPersons = {...persons};
    let totalPossibleSmalls = getTotalSmall(copyPizzas);
    const totalPossibleChildren = copyPersons.adults * 2 + copyPersons.children;

    if (totalPossibleSmalls < totalPossibleChildren) {
      if (copyPersons.adults >= 1) {
        copyPersons.adults = Math.floor((totalPossibleSmalls - copyPersons.children) / 2) <= 0 ? 1 : Math.floor((totalPossibleSmalls - copyPersons.children) / 2);
        copyPersons.children = (totalPossibleChildren - copyPersons.adults * 2) > (totalPossibleSmalls - copyPersons.adults * 2) ? (totalPossibleSmalls - copyPersons.adults * 2) : (totalPossibleChildren - copyPersons.adults * 2);
      } else {
        copyPersons.adults = 1;
        copyPersons.children = totalPossibleChildren - 2;
      }
    }
    return copyPersons;
  };

  const incrementPizzaHandler = (label) => {
    let newPizzaState = {...pizzaState};
    newPizzaState[label] = newPizzaState[label] + 1;
    newPizzaState = pizzaBestCombination(newPizzaState);
    setPizzaState(newPizzaState);

    const newPrice = calculateTotalPrice(newPizzaState, PRICE);
    setTotalPrice(newPrice);
  };

  const decrementPizzaHandler = (label) => {
    if (pizzaState[label] === 0) {
      return;
    }
    let newPizzaState = {...pizzaState};
    newPizzaState[label] = newPizzaState[label] - 1;
    if (newPizzaState[label] <= 0) {
      newPizzaState[label] = 0;
    }
    newPizzaState = pizzaBoundary(newPizzaState);
    newPizzaState = pizzaBestCombination(newPizzaState);
    setPizzaState(newPizzaState);

    const newPersonState = changePersonStateOnPizza(newPizzaState, personState);
    setPersonState(newPersonState);

    const newPrice = calculateTotalPrice(newPizzaState, PRICE);
    setTotalPrice(newPrice);
  };

  const personBoundary = (newState) => {
    const newStateCopy = {...newState};
    const totalAdults = newStateCopy.adults;
    if (totalAdults < 1) {
      newStateCopy.adults = 1;
    }
    return newStateCopy;
  };

  const changePizzaStateOnPerson = (pizzas, persons) => {
    let copyPizzas = {...pizzas};
    const copyPersons = {...persons};
    const totalPossibleSmalls = getTotalSmall(pizzas);
    const totalPossibleChildren = copyPersons.adults * 2 + copyPersons.children;

    if (totalPossibleChildren > totalPossibleSmalls) {
      copyPizzas = pizzaBestCombination({small: totalPossibleChildren, medium: 0, large: 0});
    }
    return copyPizzas;
  };

  const incrementPersonHandler = (label) => {
    let newPersonState = {...personState};
    newPersonState[label] = newPersonState[label] + 1;
    setPersonState(newPersonState);

    const newPizzaState = changePizzaStateOnPerson(pizzaState, newPersonState);
    setPizzaState(newPizzaState);

    const newPrice = calculateTotalPrice(newPizzaState, PRICE);
    setTotalPrice(newPrice);
  };

  const decrementPersonHandler = (label) => {
    if (personState[label] === 0) {
      return;
    }
    let newPersonState = {...personState};
    newPersonState[label] = newPersonState[label] - 1;
    if (newPersonState[label] <= 0) {
      newPersonState[label] = 0;
    }
    newPersonState = personBoundary(newPersonState);
    setPersonState(newPersonState);

    let newPizzaState = changePizzaStateOnPerson(pizzaState, newPersonState);
    setPizzaState(newPizzaState);

    const newPrice = calculateTotalPrice(newPizzaState, PRICE);
    setTotalPrice(newPrice);
  };


  const PizzaSlices = Object.keys(pizzaState).map(pizzaSize => (
      <PizzaSlice
        key={pizzaSize}
        size={pizzaSize}
        label={pizzaSize}
        count={pizzaState[pizzaSize]}
        onIncrement={() => incrementPizzaHandler(pizzaSize)}
        onDecrement={() => decrementPizzaHandler(pizzaSize)}
        disabled={!pizzaState[pizzaSize]} />
    )
  );

  const Persons = Object.keys(personState).map(person => (
      <Person
        key={person}
        label={person}
        count={personState[person]}
        onIncrement={() => incrementPersonHandler(person)}
        onDecrement={() => decrementPersonHandler(person)}
        disabled={!personState[person]} />
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
        <h4 className={classes.OrderTitle}>Order <span>Total</span></h4><span>{totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderTable;