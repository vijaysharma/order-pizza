import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrderTable from './OrderTable';

const mockStore = configureStore([]);
configure({adapter: new Adapter()});

describe('<OrderTable/>', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      pizza: {small: 0, medium: 1, large: 0},
      person: {adults: 1, children: 0},
      totalPrice: 200
    });
    wrapper = renderer.create(
      <Provider store={store}>
        <OrderTable />
      </Provider>
    );
  });

  it('should render <OrderTable/> correctly', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

});