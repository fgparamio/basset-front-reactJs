import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Photos from './components/photos/Photos';
import Scroll from './components/scroll/Scroll';

/**
*   @autor: fgparamio
*
*   ROOT_COMPONENT => Home Page Component
*
*/
class Root extends Component{
  /**
  *   Create main Routes links to Components
  */
  render(){
    return(
      <div>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/photos" component={Photos} />
            <Route path="/scroll" component={Scroll} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Root;
registerServiceWorker();
ReactDOM.render(<Root/>, document.getElementById('root'));
