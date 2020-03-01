import * as actionTypes from './actions';

const PRICE = {
  small: 150,
  medium: 200,
  large: 300
};
const initialState = {
  pizza: {small: 0, medium: 1, large: 0},
  person: {adults: 1, children: 0},
  totalPrice: 200
};
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

const incrementPizzaHandler = (state, label) => {
  let newPizzaState = {...state.pizza};
  newPizzaState[label] = newPizzaState[label] + 1;
  newPizzaState = pizzaBestCombination(newPizzaState);
  const newPrice = calculateTotalPrice(newPizzaState, PRICE);
  return {
    ...state,
    pizza: newPizzaState,
    totalPrice: newPrice
  };
};

const decrementPizzaHandler = (state, label) => {
  if (state.pizza[label] === 0) {
    return;
  }
  let newPizzaState = {...state.pizza};
  newPizzaState[label] = newPizzaState[label] - 1;
  if (newPizzaState[label] <= 0) {
    newPizzaState[label] = 0;
  }
  newPizzaState = pizzaBoundary(newPizzaState);
  newPizzaState = pizzaBestCombination(newPizzaState);
  const newPersonState = changePersonStateOnPizza(newPizzaState, state.person);
  const newPrice = calculateTotalPrice(newPizzaState, PRICE);

  return {
    ...state,
    pizza: newPizzaState,
    person: newPersonState,
    totalPrice: newPrice
  };
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

const incrementPersonHandler = (state, label) => {
  let newPersonState = {...state.person};
  newPersonState[label] = newPersonState[label] + 1;
  const newPizzaState = changePizzaStateOnPerson(state.pizza, newPersonState);
  const newPrice = calculateTotalPrice(newPizzaState, PRICE);
  return {
    ...state,
    pizza: newPizzaState,
    person: newPersonState,
    totalPrice: newPrice
  };
};

const decrementPersonHandler = (state, label) => {
  if (state.person[label] === 0) {
    return;
  }
  let newPersonState = {...state.person};
  newPersonState[label] = newPersonState[label] - 1;
  if (newPersonState[label] <= 0) {
    newPersonState[label] = 0;
  }
  newPersonState = personBoundary(newPersonState);
  let newPizzaState = changePizzaStateOnPerson(state.pizza, newPersonState);
  const newPrice = calculateTotalPrice(newPizzaState, PRICE);

  return {
    ...state,
    pizza: newPizzaState,
    person: newPersonState,
    totalPrice: newPrice
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INC_PIZZA:
      return incrementPizzaHandler(state, action.label);
    case actionTypes.DEC_PIZZA:
      return decrementPizzaHandler(state, action.label);
    case actionTypes.INC_PERSON:
      return incrementPersonHandler(state, action.label);
    case actionTypes.DEC_PERSON:
      return decrementPersonHandler(state, action.label);
    default:
      return state;
  }
};

export default reducer;