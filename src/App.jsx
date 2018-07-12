// Here is where all the routing to different pages takes place
// The actual links are in Navbar.js

import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.css';
import Categories from './components/Categories';
import Profile from './Accounts/Profile';
import Home from './components/Home';
import Messages from './Messages/Messages';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/login" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/messages" component={Messages} />
      </Router>
    );
  }
}

export default App;
