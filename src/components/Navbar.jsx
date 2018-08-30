import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';

Modal.setAppElement('#root');
class Navbar extends React.Component {
  render() {
    return (
      <div className="App" id="navbar">
        {/* Navbar section */}
        <nav className="navbar navbar-expand-lg "
          style={{ backgroundColor: '#182157' }}>
          <Link to="/" className="navbar-brand link" style={{
            lineHeight: '1.3', fontSize: '23px', color: '#D8D8D8',
            letterSpacing: 'normal', fontWeight: 'bold', textTransform: 'capitalize'
          }}>
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
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item active mr-3">
                <Link to="/categories" className="link" style={{ color: '#D8D8D8' }}>Categories</Link>
              </li>
              <li className="nav-item active mr-3">
                <Link to="/viewprofile" className="link" style={{ color: '#D8D8D8' }}>Profile</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
