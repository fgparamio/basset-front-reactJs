import React, { Component } from 'react';
import './Photos.css';
import axios from 'axios'
import { PulseLoader } from 'react-spinners';
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";
import { Link } from "react-router-dom";
import Header from '../Header'

/**
*   @autor: fgparamio
*
*   PHOTOS COMPONENT => Show without paging all the photos
*
*/
class Photos extends Component {

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

    this.makeRequest = this.makeRequest.bind(this)
    this.makeRequest();
  }

  /**
  *  MAKE_REQUEST => (Recursive Method)
  *      1. Set loading to true
  *      2. Throws Request to Back API while there are pages.
  */
  makeRequest () {
    this.state.loading = true;

    // Invoke With Axis to Back API
    axios.get('http://bassetbackgo-env.us-east-2.elasticbeanstalk.com/users?page='
               +this.state.page)
    .then(response => {
          // Set new State wiht response Data
          this.setState(
            {
              page: response.data.page,
              totalPages: response.data.totalPages,
              users: this.state.users.concat(response.data.users)
            });

            // If There are more pages throws a new request (Recursive)
            if(response.data.page<response.data.totalPages){
              this.setState({page: response.data.page+1})
              this.makeRequest();
            }else {
              // End with loading to false
              this.setState({loading:false})
            }
        }).catch((err)=> {})
  }


  /**
  *  RENDER MEHTOD =>
  *    Show a PhotoGrid with all the photos in every page from API
  **/
  render() {

    // Create Loader
    let loader = <PulseLoader className="sweet-loading" color={'#123abc'}
                             loading={this.state.loading} />;

    // demoPhotos model initialize
    let demoPhotos = []

    // Map users to demoPhotos with PhotoGrid model
    this.state.users.map(user =>
        demoPhotos=demoPhotos.concat({id:user.ID,src:user.avatar,bigSrc:user.avatar}))

    /**
    *   DIV_PHOTOS => Main div with PhotoGrid
    */
    let divPhotos =
      <div className="Photos,App" >
        <Link to="/">
            <button className='button'>
              <i className="fa fa-home"/>  Return Home</button>
        </Link>
        <PhotoGrid class="Photos" columns={3} photos={demoPhotos} />
        <br/><br/><br/><br/>
      </div>;

      // Hide main div while page is loading
      if(this.state.loading){
        divPhotos = <div/>
      }

    // Return page compose
    return (
      <div className="App">
        <Header/>
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
