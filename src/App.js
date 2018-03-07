import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { HashLoader } from 'react-spinners';
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'
import Photos from './Photos'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      totalPages:0,
      users: [],
      loading: true
    }

    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickPrevious = this.handleClickPrevious.bind(this)
    this.makeRequest = this.makeRequest.bind(this)
    this.makeRequest();
  }

  makeRequest () {
    console.log("Page:" + this.state.page)
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


  handleClickNext () {
    console.log("Push Next")
    if(this.state.page<this.state.totalPages){
      this.setState({page: this.state.page++, users: []})
    }
    this.makeRequest();
  }

  handleClickPrevious () {
    console.log("Push Previous")
    this.setState({page: this.state.page--, users: []})
    this.makeRequest();
  }

  render() {

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

    let loader = <HashLoader className="sweet-loading" color={'#123abc'}
                             loading={this.state.loading} />;

    let divCompleteButton =
       <div>
        <Link to="/photos"><button className='button button_complete'>Show Complet List</button></Link>
        <br/><br/><br/><br/>
       </div>;

    if (this.state.loading) {
      divButtons = <div/>
      divCompleteButton = <div/>
    }



    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Basset Users</h1>
        </header>
        <div className='sweet-loading'>
          {loader}
        </div>
        <br/>
        {divButtons}
        <div className="body__container">
          <ul className="basset-ul">
           {
             this.state.users.map(user =>
               <li className="basset-li" key={user.ID}>
                 <VisibilitySensor>
                     <Img className="basset-img" src={user.avatar} loader={loader} />
                 </VisibilitySensor>
                 <span className="basset-span">
                   <b> {user.ID}-{user.name} </b>
                 </span>
              </li>
            )}
         </ul>
         {divCompleteButton}
        </div>
      </div>
    ); // End Return
  } // End Render
} // End App

export default App;
