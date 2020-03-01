import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PizzaSlice from './PizzaSlice';
import PizzaPortion from '../../ui/PizzaPortion/PizzaPortion';
import CounterButton from '../../ui/CounterButton/CounterButton';

configure({adapter: new Adapter()});

describe('<PizzaSlice/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PizzaSlice />);
  });

  it('should render <PizzaSlice/> component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render <PizzaSlice/> correctly', () => {
    wrapper.setProps({
      label: 'medium',
      size: 'medium'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <PizzaSlice/> component', () => {
    expect(wrapper.find(CounterButton)).toHaveLength(1);
  });

  it('should render <PizzaSlice/> component', () => {
    expect(wrapper.find(PizzaPortion)).toHaveLength(1);
  });
});