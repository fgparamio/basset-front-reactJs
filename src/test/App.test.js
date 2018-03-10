import React from 'react';
import { expect } from 'chai';
import { shallow, mount} from 'enzyme';
import sinon from 'sinon';
import App from '../App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { HashLoader } from 'react-spinners';
import VisibilitySensor from 'react-visibility-sensor';



// Configure ES6 Adapter
configure({ adapter: new Adapter() });

/**
*  APP MAIN TEST
*/
describe('<App />', () => {

  let app

  beforeEach(function () {
    app = shallow(<App />);
  })

  it('should render a <App> tag', () => {
    // WHEN => THEN
    expect(app.type()).equal('div')
  });

  it('renders <Header /> component', () => {
    const wrapper = mount(<Router><App /></Router>);
    expect(wrapper.find('.App-header')).to.have.length(1);
  });

  it('renders Two <Link /> components', () => {
      // WHEN => THEN
    expect(app.find(Link)).to.have.length(2)
  });

  it('simulates click next event', () => {
    // GIVEN
    const spy = sinon.spy(App.prototype, 'handleClickNext')
    const wrapper = shallow(<App />)
    // WHEN
    wrapper.find('.buttonNext').simulate('click')
    // THEN
    expect(spy.calledOnce).to.equal(true)

  });

  it('simulates click Previous event', () => {
    const spy = sinon.spy(App.prototype, 'handleClickPrevious')
    const wrapper = shallow(<App />)
    // WHEN
    wrapper.find('.buttonPrevious').simulate('click')
    // THEN
    expect(spy.calledOnce).to.equal(true)
  });

  it('Click Photos event', () => {
    // WHEN
    app.find('.button_photos').simulate('click')
    // THEN
    expect(app.find(Link).first().props().to).equal('/photos')
  });

  it('Click Photos event', () => {
    const wrapper = shallow(<App />)
    // WHEN
    app.find('.button_scroll').simulate('click')
    // THEN
    expect(app.find(Link).last().props().to).equal('/scroll')
  });

  it('Check State Users render', () => {
    // Set three users to State
    app.setState({page: 1, totalPages: 4, users: [{ID:1, name:"Name 1",avatar:"one.jpg"},
    {ID:2, name:"Name 2",avatar:"two.jpg"}, {ID:3, name:"Name 3",avatar:"three.jpg"}] , loading: false});
    expect(app.find(VisibilitySensor)).to.have.length(3);
    expect(app.find('.basset-li')).to.have.length(3);

  });

  it('Check Loading Component', () => {
    // Set three users to State
    expect(app.find(HashLoader)).to.have.length(1);
  });


});
