//Here is where all the routing to different pages takes place
//The actual links are in Navbar.js

import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Categories from './Categories'
import SignUp from './SignUp';
import Home from './Home';
import Messages from './Messages'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/login" component={Home}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/messages" component={Messages}/>

      </Router>
    );
  }
}

export default App;