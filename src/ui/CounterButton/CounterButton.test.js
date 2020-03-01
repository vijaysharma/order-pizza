import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CounterButton from './CounterButton';

configure({adapter: new Adapter()});

describe('<CounterButton/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CounterButton />);
  });

  it('should render <CounterButton/> component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render <CounterButton/> correctly', () => {
    wrapper.setProps({
      count: 10
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <CounterButton/> component with count 10', () => {
    wrapper.setProps({
      count: 10
    });
    expect(wrapper.find('span').text().includes(10)).toBe(true);
  });

  it('should render <CounterButton/> component with count 5', () => {
    wrapper.setProps({
      count: 5
    });
    expect(wrapper.find('span').text().includes(5)).toBe(true);
  });

  it('should render <CounterButton/> component with icon', () => {
    expect(wrapper.find(FontAwesomeIcon)).toHaveLength(2);
  });

});