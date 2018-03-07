import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Photos from './Photos';
import Scroll from './Scroll';


ReactDOM.render(
  <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/photos" component={Photos} />
        <Route path="/scroll" component={Scroll} />
      </div>
  </Router>
   , document.getElementById('root'));

registerServiceWorker();
