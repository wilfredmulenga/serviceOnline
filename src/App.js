import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Categories from './Categories'
import SignUp from './SignUp';
import Home from './Home';
import IntegrationAutosuggest from './IntegrationAutosuggest'


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/login" component={Home}/>
        <Route path="/signup" component={SignUp}/>
        <Route path='/autocomplete' component = {IntegrationAutosuggest} />
      </Router>
    );
  }
}

export default App;