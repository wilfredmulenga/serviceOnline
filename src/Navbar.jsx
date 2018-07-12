import React from 'react';
import { Link } from 'react-router';
import Firebase from './config/firebase';

const styles = {
  color: 'purple',
};
let loginStatus = 'Log In/Sign Up';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    };
  }
  componentWillMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        loginStatus = 'Signed In';
      } else {
        loginStatus = 'Log In/Sign Up';
      }
    });
  }

  render() {
    return (
      <div className="App">
        {/* Navbar section */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Project Name
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active mr-3" style={styles}>
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item active mr-3">
                <Link to="/categories">Categories</Link>
              </li>
              <li className="nav-item active mr-3">
                <Link to="/login" onClick={this.props.action}>
                  {loginStatus}{' '}
                </Link>
              </li>
              <li className="nav-item active mr-3">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="nav-item active mr-3">
                <Link to="/messages">Messages</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
