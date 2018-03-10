import React from 'react';
import { expect } from 'chai';
import { shallow , render, mount } from 'enzyme';
import sinon from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Photos from '../components/photos/Photos';
import PhotoGrid from "react-photo-feed";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


// Configure ES6 Adapter
configure({ adapter: new Adapter() });

/**
*  PHOTOS MAIN TEST
*/
describe('<Photos />', () => {

  let photos

  beforeEach(function () {
    photos = shallow(<Photos />);
  })

  it('should render a <Photos> tag', () => {
    // WHEN => THEN
    expect(photos.type()).equal('div')
  });

  it('Renders <Header /> component', () => {
    const wrapper = mount(<Router><Photos /></Router>);
    expect(wrapper.find('.App-header')).to.have.length(1);
  });

  it('Renders <PulseLoader /> component', () => {
    const wrapper = mount(<Router><Photos /></Router>);
    expect(wrapper.find('.sweet-loading')).to.have.length(2);
  });

});
