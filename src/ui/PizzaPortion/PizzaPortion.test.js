import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PizzaPortion from './PizzaPortion';

configure({adapter: new Adapter()});

describe('<Person/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PizzaPortion />);
  });

  it('should render <PizzaPortion/> component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render <PizzaPortion/> correctly', () => {
    wrapper.setProps({
      label: 'small'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <PizzaPortion/> component with label MEDIUM', () => {
    wrapper.setProps({
      label: 'medium'
    });
    expect(wrapper.find('span').text().includes('MEDIUM')).toBe(true);
  });

  it('should render <PizzaPortion/> component with label LARGE', () => {
    wrapper.setProps({
      label: 'large'
    });
    expect(wrapper.find('span').text().includes('LARGE')).toBe(true);
  });

  it('should render <PizzaPortion/> component with icon', () => {
    expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1);
  });


});