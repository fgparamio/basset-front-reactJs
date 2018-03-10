import React from 'react';
import { expect } from 'chai';
import { shallow , render, mount } from 'enzyme';
import sinon from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Photos from '../components/photos/Photos';
import { Header } from '../components/Header';

// Configure ES6 Adapter
configure({ adapter: new Adapter() });

/**
*  PHOTOS MAIN TEST
*/
describe('<Photos />', () => {

  it('renders <Header/> component', () => {
    const wrapper = shallow(<Photos />);
  });

});
