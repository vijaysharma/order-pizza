import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Person from './Person';
import CounterButton from '../../ui/CounterButton/CounterButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

configure({adapter: new Adapter()});

describe('<Person/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Person />);
  });

  it('should render <PizzaSlice/> component', () => {
    expect(wrapper.find(CounterButton)).toHaveLength(1);
  });

  it('should render <PizzaSlice/> correctly', () => {
    wrapper.setProps({
      label: 'adults',
      count: 1
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <PizzaSlice/> component with label ADULTS', () => {
    wrapper.setProps({
      label: 'adults',
      count: 1
    });
    expect(wrapper.find('h2').text().includes('ADULTS')).toBe(true);
  });

  it('should render <PizzaSlice/> component with icon', () => {
    expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1);
  });


});