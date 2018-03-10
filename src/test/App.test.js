import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure ES6 Adapter
configure({ adapter: new Adapter() });

/**
*  APP MAIN TEST
*/
describe('<App />', () => {
  it('renders Two <Link /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Link)).to.have.length(2);
  });
  
});
