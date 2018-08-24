import React from 'react';
import { Link } from 'react-router';
import Firebase from '../config/firebase';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';


let loginStatus

Modal.setAppElement('#root');
class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);

  }

  handleSignOut() {
    Firebase.auth().signOut();
    this.setState({
      signOutModalIsOpen: false,
      signInModalIsOpen: true
    })

  }

  render() {
    return (
      <div className="App" id="navbar">
        {/* Navbar section */}
        <nav className="navbar navbar-expand-lg "
          style={{ backgroundColor: '#182157' }}>
          <Link to="/" className="navbar-brand link" style={{lineHeight: '1.3',fontSize:'23px',
                         letterSpacing: 'normal',fontWeight: 'bold',textTransform: 'capitalize'}}>
            Nchito

         </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse  navbar-right ">
            {/* <img id='userPic' style={{ width: 40, height: 40, borderRadius: 20 }} /> */}
            <ul className="navbar-nav mr-auto ">

              <li className="nav-item active mr-3">
                <Link to="/categories" className="link">Categories</Link>
              </li>
              {/* <Link to="/login" className="link" //onClick={this.props.action} 
                onClick={this.openSignInModal}>
                <li className="nav-item active mr-3" id='login'>{
                  (loginStatus) ? `Sign Out` : `Sign In`
                }
                </li>
              </Link> */}
              <li className="nav-item active mr-3">
                <Link to="/viewprofile" className="link">Profile</Link>
              </li>
              {/* <li className="nav-item active mr-3">
                <Link to="/phonelogin" className="link">Login</Link>
              </li> */}
            </ul>
          </div>
        </nav>
      </div >
    );
  }
}

export default Navbar;
