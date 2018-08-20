// Here is where all the routing to different pages takes place
// The actual links are in Navbar.js

import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.css';
import Categories from './components/Categories';
import Home from './components/Home';
import Messages from './Messages/Messages';
import ViewProfile from './Accounts/ViewProfile';
import UpdateProfile from './Accounts/UpdateProfile';
import PhoneLogin from './Accounts/PhoneLogin';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/categories" component={Categories} />
        <Route path="/login" component={Home} />
        <Route path="/updateprofile" component={UpdateProfile} />
        <Route path="/messages" component={Messages} />
        <Route path='/viewprofile' component={ViewProfile} />
        <Route path='/phonelogin' component={PhoneLogin} />
      </Router>
    );
  }
}

export default App;
