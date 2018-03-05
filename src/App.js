import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { HashLoader } from 'react-spinners';


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
    axios.get('http://bassetbackgo-env.us-east-2.elasticbeanstalk.com/users?page='+this.state.page)
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

  handleClickPrevious = () => {
    console.log("Push Previous")
    this.setState({page: this.state.page--, users: []})
    this.makeRequest();
  }

  render() {

    let divButtons =
    <div className='button__container'>
      <button disabled={this.state.page<=1}
        className='button' onClick={this.handleClickPrevious}>Previous</button>
      <button disabled={this.state.page===this.state.totalPages}
        className='button' onClick={this.handleClickNext}>Next</button>
    </div>;

    if (this.state.loading) {
      divButtons = <div/>
    }

    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Basset Users</h1>
        </header>
        <div className='sweet-loading'>
          <HashLoader className="sweet-loading" color={'#123abc'} loading={this.state.loading} />
        </div>
        <div className="body__container">
          <br></br><br></br>
          <ul>
           {
             this.state.users.map(user =>
               <li className="basset-li" key={user.ID}><b>{user.name}</b>
                    <img alt={user.name} src={user.avatar}/>
              </li>
            )}
         </ul>
        {divButtons}
        </div>      
      </div>
    );
  }
}

export default App;
