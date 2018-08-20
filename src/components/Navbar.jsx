import React from 'react';
import { Link, browserHistory } from 'react-router';
import Firebase from '../config/firebase';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
  },
};

let errorMessage;
let loginStatus

Firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    loginStatus = true
  } else {

    loginStatus = false
  };
})
Modal.setAppElement('#root');
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpModalIsOpen: false,
      signInModalIsOpen: false,
      signOutModalIsOpen: false,

      email: '',
      password: '',
      reenterPassword: '',
      passwordMisMatch: false,
      error: null,
    };
    this.openSignInModal = this.openSignInModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeAllModals = this.closeAllModals.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.closeSignInModal = this.closeSignInModal.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    //this.userPic = document.getElementById('userPic');

  }



  openSignUpModal() {

    this.setState({
      signUpModalIsOpen: true,
      signInModalIsOpen: false,
    });

  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeAllModals() {
    this.setState({ signUpModalIsOpen: false });
    this.setState({ signInModalIsOpen: false });
  }

  closeSignInModal() {
    this.setState({
      signInModalIsOpen: false,
      signUpModalIsOpen: true,
    });
  }

  openSignInModal() {
    if (loginStatus) {
      this.setState({ signOutModalIsOpen: true });
    } else {
      this.setState({
        signInModalIsOpen: true,
        signUpModalIsOpen: false,
      })
    }
  }

  handleSignUp() {
    // var email ="asa@yahoo.com";
    // var password = "12345678";

    this.state.email === ''
      ? this.setState({ error: 'email field cannot be empty' })
      : this.state.password === this.state.reenterPassword
        ? Firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((user) => {
            console.log(user);
            //browserHistory.push('/signup');

          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            errorMessage = error.message;

            console.log(errorCode, errorMessage);
            // ...
          }) &&
        // cant setState within the catch function so I did it outside
        this.setState({
          error: errorMessage,
        })
        : this.setState({
          passwordMisMatch: true,
        });
  }

  handleSignIn() {
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        loginStatus = true;

      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // var errorMessage = error.message;
        errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
      });
    this.setState({
      error: errorMessage,
    });
    this.closeAllModals()
  }

  handleSignOut() {
    Firebase.auth().signOut();
    this.setState({
      signOutModalIsOpen: false,
      signInModalIsOpen: true
    })

  }

  handleInput(event) {
    if (event.target.placeholder === 'email') {
      this.setState({
        email: event.target.value,
      });
    } else if (event.target.placeholder === 'password') {
      this.setState({
        password: event.target.value,
        passwordMisMatch: false,
      });
    } else if (event.target.placeholder === 're-enter password') {
      this.setState({
        reenterPassword: event.target.value,
        passwordMisMatch: false,
      });
    }
  }


  render() {
    return (
      <div className="App" id="navbar">
        {/* Navbar section */}
        <nav className="navbar navbar-expand-lg "
          style={{ backgroundColor: '#182157' }}>
          <Link to="/" className="navbar-brand link">
            Fixer

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
              <Link to="/login" className="link" //onClick={this.props.action} 
                onClick={this.openSignInModal}>
                <li className="nav-item active mr-3" id='login'>{
                  (loginStatus) ? `Sign Out` : `Sign In`
                }
                </li>
              </Link>
              <li className="nav-item active mr-3">
                <Link to="/viewprofile" className="link">Profile</Link>
              </li>
              <li className="nav-item active mr-3">
                <Link to="/phonelogin" className="link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <SignUp Modal /> */}

        <Modal
          isOpen={this.state.signUpModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeAllModals}
          style={customStyles}
          contentLabel="Example Modal">
          <div className='row d-flex justify-content-end'>
            <Button color="secondary" onClick={this.closeAllModals}>
              Close
      </Button>
          </div>
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Sign Up</h2>

          <form>
            <div className="col mb-3">
              <input
                type="email"
                value={this.state.email}
                onChange={this.handleInput}
                className="form-control"
                required
                placeholder="email"
              />
            </div>
            <div className="col mb-3">
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleInput}
                className="form-control"
                placeholder="password"
              />
            </div>
            <div className="col mt-2  mb-3">
              <input
                type="password"
                value={this.state.reenterPassword}
                onChange={this.handleInput}
                className="form-control"
                placeholder="re-enter password"
              />

              {this.state.passwordMisMatch ? (
                <p style={{ color: 'red' }}>passwords did not match</p>
              ) : null}
              {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
            </div>
          </form>

          <div className='row d-flex justify-content-center mt-4 mb-5'> <Button variant="contained" color='primary' className="md-3" type="submit" onClick={this.handleSignUp}>
            Sign Up
              </Button></div>

          <div>
            If you already have an account, you can{' '}
            <Button variant="contained" color="secondary" onClick={this.openSignInModal}>
              Sign In
              </Button>
          </div>
        </Modal>
        {/* Sign In Modal */}
        <Modal isOpen={this.state.signInModalIsOpen} style={customStyles}>
          <div className='row d-flex justify-content-end'>
            <Button color="secondary" onClick={this.closeAllModals}>
              Close
      </Button>
          </div>
          <div>
            <h2>Sign In</h2>
            <form>
              <div className="col mb-3">
                <input
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInput}
                  className="form-control"
                  required
                  placeholder="email"
                />
              </div>
              <div className="col mb-4">
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                  className="form-control"
                  placeholder="password"
                />
              </div>
              {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
            </form>
            <div className="row d-flex justify-content-center mt-4 mb-5">
              <Button variant='contained' color='primary' type="submit" onClick={this.handleSignIn}>
                Sign In
                </Button>
            </div>
            <div>
              Don't have an account? You can{' '}
              <Button variant='contained' color="secondary" onClick={this.openSignUpModal}>
                Sign Up
                </Button>
            </div>
          </div>
        </Modal>
        {/* Sign Out Modal */}
        <Modal isOpen={this.state.signOutModalIsOpen} style={customStyles}>
          <h5> Sign Out ? </h5>
          <div style={{ textAlign: 'center' }}>
            <Button className='ml-5' variant='contained' color='secondary' onClick={this.handleSignOut}>Yes</Button>
          </div>
        </Modal>
      </div >
    );
  }
}

export default Navbar;
