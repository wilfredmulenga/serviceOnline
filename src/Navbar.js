import React from 'react';
import {  Link } from 'react-router';
import logo from './logo.svg';

const Navbar = ({ title }) => (
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

export default Navbar;