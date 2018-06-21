import React from 'react';
import {  Link } from 'react-router';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Modal from 'react-modal';
import Firebase from '../src/config/firebase';

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            loginStatus : false
        })
        //this.handleClick = this.handleClick.bind(this)
    }

    // handleClick(){
    //    this.setState({
    //        loginStatus : true
    //    })
    // }
    render(title){
        return(
    <div className="App container-fluid">
       {/*Navbar section*/}
   <div className="App-header">
   <div className="row">
   <img src={logo} className="App-logo" alt="logo" />
   <h4><Link to="/">Home</Link></h4>
   <h4><Link to="/about">About</Link></h4>
   <h4><Link to="/categories">Categories</Link></h4>
   <h4><Link to="/login" onClick={this.props.action} >Log In/Sign Up</Link></h4>
   <h4 className="App-intro">
        This is the {title} page.
      </h4>
  </div>
  </div>
        
    </div>
        )
    }
}





export default Navbar;