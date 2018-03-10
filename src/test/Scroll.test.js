import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Scroll from '../components/scroll/Scroll';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Header } from '../components/Header';

// Configure ES6 Adapter
configure({ adapter: new Adapter() });

/**
*  SCROLL MAIN TEST
*/
describe('<Scroll />', () => {

  it('renders One <Link /> components', () => {
    const wrapper = shallow(<Scroll />);
    expect(wrapper.find(Link)).to.have.length(1);
  });

  it('renders <InfiniteScroll /> component', () => {
    const wrapper = shallow(<Scroll />);
    expect(wrapper.find(InfiniteScroll)).to.have.length(1);
  });

});
