import React from 'react';
import {  Link } from 'react-router';
import Firebase from './config/firebase';

const styles = {
    color : "purple"
  
}
var loginStatus = "Log In/Sign Up"


class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            loginStatus : false
        })
        
    }
    componentWillMount(){
        Firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              
              loginStatus = "Signed In";
            } else {
                loginStatus = "Log In/Sign Up";
            }
        })
    }
 

    render(){
       
        return(
    <div className="App">
       {/*Navbar section*/}
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
   <a class="navbar-brand" href="#">Project Name</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto">
   <li className="nav-item active mr-3" style={styles}><Link to="/">Home</Link></li>
   <li className="nav-item active mr-3"><Link to="/categories">Categories</Link></li>
   <li className="nav-item active mr-3"><Link to="/login" onClick={this.props.action} >{loginStatus} </Link></li>
   <li className="nav-item active mr-3"><Link to="/signup">Profile</Link></li>
   <li className="nav-item active mr-3"><Link to="/messages">Messages</Link></li>
   
  </ul>
  </div>
  </nav>    

    </div>
        )
    }
}





export default Navbar;