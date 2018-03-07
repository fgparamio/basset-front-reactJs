import React, { Component } from 'react';
import './Scroll.css';
import axios from 'axios'
import { PulseLoader } from 'react-spinners';
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Img from 'react-image';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';


class Scroll extends Component {


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

  makeRequest () {
    axios.get('http://bassetbackgo-env.us-east-2.elasticbeanstalk.com/users?page='
               +this.state.page)
    .then(response => {
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

   generateDivs() {

     let moreDivs = [];
     let count = this.state.divs.length;

     for (let i = 0; i < this.state.users.length ; i++) {
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
      this.setState({divs: this.state.divs.concat(moreDivs)});
   }



  render() {

    let loader = <ClipLoader className="sweet-loading" color={'#123abc'}/>;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Basset Users</h1>
        </header>
        <br/>
        <div className="scroll__container">
        <Link to="/">
            <button className='button'>
              <i className="fa fa-home"/>  Return Home</button>
        </Link>
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
