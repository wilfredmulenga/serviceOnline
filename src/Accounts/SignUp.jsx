import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
let loginStatus;
let errorMessage;






class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      passwordMisMatch: '',
      reenterPassword: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this)
  }
  handleSignUp() {


    this.state.email === ''
      ? this.setState({ error: 'email field cannot be empty' })
      : this.state.password === this.state.reenterPassword
        ? Firebase.auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((user) => {
            console.log(user)
            browserHistory.push('/categories');

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
      <div className="row justify-content-center text-center">
        <div style={{ width: '30%', height: '50%', top: '50%', marginTop: 20 }}>
          <div>
            <h1 style={{ margin: 50 }}>Welcome to Fixer</h1>
            <h2 style={{ margin: 50 }}>Sign Up</h2>

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
              <Button variant="contained" color="secondary"
                onClick={() => browserHistory.push('/signin')}>
                Sign In
    </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
