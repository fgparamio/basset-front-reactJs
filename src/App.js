import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { HashLoader } from 'react-spinners';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from "react-router-dom";
import Header from './components/Header'

/**
*   @autor: fgparamio
*
*   APP COMPONENT => Home Page Component
*
*/
class App extends Component {

  /**
  *  CONSTRUCTOR => Initialize State and Make first Request
  */
  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      totalPages:0,
      users: [],
      loading: true
    }

    // Binding Methods
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickPrevious = this.handleClickPrevious.bind(this)
    this.makeRequest = this.makeRequest.bind(this)
    this.makeRequest();
  }


  /**
  *  MAKE_REQUEST =>
  *      1. Set loading to true
  *      2. Throws Request to Back API while there are pages.
  */
  makeRequest () {
    this.state.loading = true;
    axios.get('http://bassetbackgo-env.us-east-2.elasticbeanstalk.com/users?page='
               +this.state.page)
    .then(response => {
          this.setState(
            {
              loading: false,
              page: response.data.page,
              totalPages: response.data.totalPages,
              users: response.data.users
            });
        }).catch((err)=> {})
  }

  /**
  *   Handle Next Clict Button Event
  *     1. Check if exist more pages
  *     2. Send new Request with next Page
  */
  handleClickNext () {
    console.log("Push Next")
    if(this.state.page<this.state.totalPages){
      this.setState({page: this.state.page++, users: []})
    }
    this.makeRequest();
  }

  /**
  *   Handle Previous Clict Button Event
  *     1. Check if is first Page
  *     2. Send new Request with previous Page
  */
  handleClickPrevious () {
    console.log("Push Previous")
    this.setState({page: this.state.page--, users: []})
    this.makeRequest();
  }

  /**
  *  RENDER MEHTOD =>
  *    Show a Page with ID, Name and avatar photo
  **/
  render() {

    // Create Show Photos and Complete List Buttons
    let divCompleteButton =
       <div>
          <Link to="/photos"><button className='button button_complete'>
            <i className="fa fa-photo"/>  Show Photos</button>
          </Link>
          <Link to="/scroll"><button className='button button_complete'>
            <i className="fa fa-list"/>  Complete List</button>
          </Link>
        <br/><br/><br/><br/>
       </div>;

    // Create DivButtons element (next and previous buttons)
    let divButtons =
    <div className='button__container'>
      <button disabled={this.state.page<=1}
        className='button' onClick={this.handleClickPrevious}>
        <i className="fa fa-arrow-left"/> Previous
      </button>
      <button disabled={this.state.page===this.state.totalPages}
        className='button' onClick={this.handleClickNext}>
        Next   <i className="fa fa-arrow-right"/>
      </button>
    </div>;

    // Create loader for this component
    let loader = <HashLoader className="sweet-loading" color={'#123abc'}
                             loading={this.state.loading} />;
 
   // Return page compose with VisibilitySensor for images
    return (
      <div className="App">
        <Header/>
        <div className='sweet-loading'>
          {loader}
        </div>
        <br/>
        {divCompleteButton}{divButtons}
        <div className="body__container">
          <ul className="basset-ul">
           {
             this.state.users.map(user =>
               <li className="basset-li" key={user.ID}>
                 <span className="basset-span">
                   <b> {user.ID}-{user.name} </b>
                 </span>
                 <VisibilitySensor>
                     <Img className="basset-img" src={user.avatar} loader={loader} />
                 </VisibilitySensor>
              </li>
            )}
         </ul>
        </div>
      </div>
    ); // End Return
  } // End Render
} // End App

export default App;
