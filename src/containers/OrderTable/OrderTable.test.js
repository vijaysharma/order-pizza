import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderTable from './OrderTable';
import PizzaSlice from '../../components/PizzaSlice/PizzaSlice';
import Person from '../../components/Person/Person';
import * as ButtonClasses from '../../ui/CounterButton/CounterButton.module.css';

configure({adapter: new Adapter()});

describe('<OrderTable/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OrderTable />);
  });

  it('should render <OrderTable/> component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render <OrderTable/> correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <OrderTable/> component with 3 PizzaSlice', () => {
    expect(wrapper.find(PizzaSlice)).toHaveLength(3);
  });

  it('should render <OrderTable/> component with 2 Person', () => {
    expect(wrapper.find(Person)).toHaveLength(2);
  });

});