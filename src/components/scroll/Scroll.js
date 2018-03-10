import React, { Component } from 'react';
import './Scroll.css';
import axios from 'axios'
import "react-photo-feed/library/style.css";
import { Link } from "react-router-dom";
import Img from 'react-image';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../Header'

/**
*   @autor: fgparamio
*
*   SCROLL COMPONENT => Show Data Photos in a Infinite Scroll
*
*/
class Scroll extends Component {

  /**
  *  CONSTRUCTOR => Initialize State and Make first Request
  */
  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      totalPages:0,
      users: [],
      divs:[],
      hasMore:true
    }

    this.generateDivs = this.generateDivs.bind(this);
    this.makeRequest = this.makeRequest.bind(this);

    this.makeRequest();
  }

  /**
  *   1. Send Request API
  *   2. Generte Divs necesary for InfiniteScroll
  */
  makeRequest () {

    // Throws Axios Request to Back API
    axios.get('http://bassetbackgo-env.us-east-2.elasticbeanstalk.com/users?page='
               +this.state.page)
    .then(response => {
          // Set state with data Response
          this.setState(
            {
              page: response.data.page,
              totalPages: response.data.totalPages,
              users: response.data.users
            });

            if(response.data.page<response.data.totalPages){
              this.setState({page: response.data.page+1})
            }else {
              this.setState({hasMore: false})
              this.setState({loading:false})
            }
            this.generateDivs();
        }).catch((err)=> {})
  }

   /**
   *  Concatenate old divs with previous results with new result Data
   *  Set new divs to state
   */
   generateDivs() {

     // Local moreDivs and count var initialize
     let moreDivs = [];
     let count = this.state.divs.length;

     // For every user in state
     for (let i = 0; i < this.state.users.length ; i++) {
       // Create a new Div
       moreDivs.push(
           <div key={'div' + count++} className="basset_div_scroller">
              <div>
                <span className="basset-span-scroll"><b>{this.state.users[i].ID} - </b></span>
                <span className="basset-span-scroll"><b>{this.state.users[i].name}</b></span>
              </div>
              <div>
                <Img className="basset-img" src={this.state.users[i].avatar}/>
                <br/>
              </div>
            </div>
        );
      }

      // Concat divs in state
      this.setState({divs: this.state.divs.concat(moreDivs)});
   }

  /**
  *  RENDER MEHTOD =>
  *    Show a infinite Scrool from first page to max page
  **/
  render() {

    // Create default loader for this component
    let loader = <ClipLoader className="sweet-loading" color={'#123abc'}/>;

    // Return Render Component
    // Main Div -> Header -> Scroll container -> InfiniteScroll
    return (
      <div className="App">
        <Header/>
        <br/>
        <div className="scroll__container">
          <Link to="/">
            <button className='button'>
              <i className="fa fa-home"/>  Return Home</button>
          </Link>
          // Show Infinite Scroll
          // More information in : https://github.com/ankeetmaini/react-infinite-scroll-component
          <InfiniteScroll
            next={this.makeRequest}
            hasMore={this.state.hasMore}
            height={650}
            loader={loader}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <br/><b>Yay! You have seen it all </b>
              </p>
            }>
            {this.state.divs}
          </InfiniteScroll>
        </div>
      </div>
     ); // End return
  } // End render()
} // End Component

export default Scroll;
