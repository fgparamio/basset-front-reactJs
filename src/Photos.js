import React, { Component } from 'react';
import './Photos.css';
import axios from 'axios'
import { PulseLoader } from 'react-spinners';
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Photos extends Component {

  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      totalPages:0,
      users: [],
      loading: true
    }

    this.makeRequest = this.makeRequest.bind(this)
    this.makeRequest();
  }

  makeRequest () {
    this.state.loading = true;
    axios.get('http://bassetbackgo-env.us-east-2.elasticbeanstalk.com/users?page='
               +this.state.page)
    .then(response => {
          this.setState(
            {
              page: response.data.page,
              totalPages: response.data.totalPages,
              users: this.state.users.concat(response.data.users)
            });

            if(response.data.page<response.data.totalPages){
              this.setState({page: response.data.page+1})
              this.makeRequest();
            }else {
              this.setState({loading:false})
            }
        }).catch((err)=> {})
  }



  render() {

    let loader = <PulseLoader className="sweet-loading" color={'#123abc'}
                             loading={this.state.loading} />;
    let demoPhotos = []

    this.state.users.map(user =>
        demoPhotos=demoPhotos.concat({id:user.ID,src:user.avatar,bigSrc:user.avatar}))

    let size = demoPhotos.length;

    let divPhotos =
      <div className="Photos">
        <Link to="/"><button className='button'>Volver a Inicio</button></Link>
        <PhotoGrid class="Photos" columns={3} photos={demoPhotos} />
        <br/><br/><br/><br/>
      </div>;

      if(this.state.loading){
        divPhotos = <div/>
      }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Basset Users</h1>
        </header>
        <br/>
        <div className="photo__container">
            {loader}
            {divPhotos}
        </div>
      </div>
     ); // End return
  } // End render()
} // End Component

export default Photos;
