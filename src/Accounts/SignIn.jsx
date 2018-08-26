import React from 'react';
import Button from '@material-ui/core/Button';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
let loginStatus;
let errorMessage;






class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this)
  }
  handleInput(event) {
    if (event.target.placeholder === 'email') {
      this.setState({
        email: event.target.value,
      });

    }
    else if (event.target.placeholder === 'password') {
      this.setState({
        password: event.target.value,
      });

    }
  }

  handleSignIn() {
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        loginStatus = true;
        browserHistory.push('/');
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
  }


  render() {
    return (
      <div className="row justify-content-center text-center">
        <div style={{ width: '30%', height: '50%', top: '50%', marginTop: 20 }}>
          <div>
            <h1 style={{ margin: 50 }}>Welcome to Fixer</h1>
            <h2 style={{ margin: 50 }}>Sign In</h2>
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
              <Button variant='contained' color='primary' type="submit"
                onClick={this.handleSignIn}>
                Sign In
                </Button>
            </div>
            <div>
              Don't have an account? You can{' '}
              <Button variant='contained' color="secondary"
                onClick={() => browserHistory.push('/signup')}
              >
                Sign Up
                </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
