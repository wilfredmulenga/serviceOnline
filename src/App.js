import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
//import {Alert, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import landingPage from './landingPage.jpeg'
import {Button} from 'mdbreact'


const Page = ({ title }) => (
    <div className="App container-fluid">
       {/*Navbar section*/}
   <div className="App-header">
   <div className="row">
   <img src={logo} className="App-logo" alt="logo" />
   <h4><Link to="/">Home</Link></h4>
   <h4><Link to="/about">About</Link></h4>
   <h4><Link to="/categories">Categories</Link></h4>
   <h4><Link to="/login">Log In/Sign Up</Link></h4>
   <h4 className="App-intro">
        This is the {title} page.
      </h4>
  </div>
  </div>
        
    </div>
    
);

class Card extends React.Component {
  render() {
    return <div className="col-md-4"><h4>{this.props.title}</h4>
                <p>{this.props.text}</p>
            </div>;
  }
}

const Home = (props) => (
  <div>
    <Page title="Home"/>
 {/*Landing Page Image section*/}
  <div className="landingPageImage">
   <img src={landingPage} style={{width:"1520px"}} />
  </div>
  {/*How it Works section*/}
  <div style={{textAlign:"center"}}>
    <h3>How It Works</h3>
    <div className="row container-fluid">
   <Card title="I want to get hired" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
   <Card title="I want to hire someone" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
   <Card title="I want to be a partner" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
    </div>
   
  </div>
  
  </div>
  
);

const About = (props) => (
  <Page title="About"/>
);

const Categories = (props) => (
  <Page title="Categories"/>
);

const Login = (props) =>(
  <Page title="Login"/>
);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/login" component={Login}/>
      </Router>
    );
  }
}

export default App;