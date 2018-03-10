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
import Img from 'react-image';


// Configure ES6 Adapter
configure({ adapter: new Adapter() });

/**
*  SCROLL MAIN TEST
*/
describe('<Scroll />', () => {

  let scroll

  beforeEach(function () {
    scroll  = shallow(<Scroll />);
  })

  it('Renders One <Link /> components', () => {
    expect(scroll.find(Link)).to.have.length(1);
  });

  it('Renders <InfiniteScroll /> component', () => {
    expect(scroll.find(InfiniteScroll)).to.have.length(1);
  });

  it('Renders <Header /> component', () => {
    const wrapper = mount(<Router><Scroll /></Router>);
    expect(wrapper.find('.App-header')).to.have.length(1);
  });

  it('Renders <ClipLoader /> component', () => {
    const wrapper = mount(<Router><Scroll /></Router>);
    expect(wrapper.find('.sweet-loading')).to.have.length(2);
  });

});
