import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.css';
import Categories from './components/Categories';
import Home from './components/Home';
import Messages from './Messages/Messages';
import ViewProfile from './Accounts/ViewProfile';
import UpdateProfile from './Accounts/UpdateProfile';
import SignIn from './Accounts/SignIn'
import SignUp from './Accounts/SignUp'
import Firebase from './config/firebase'
import { Provider } from './Accounts/UserContext'
import Loader from './components/Loader'
import jsonData from './database/NchitoUserDatabase.json'

let peopleArray = [];
let JobsSnapshot;
// Firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     //handleLoadUsers()
//   } else {
//     browserHistory.push('/signin')
//   }
// })

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      listOfPeople: []
    }
    this.handleLoadUsers = this.handleLoadUsers.bind(this)
    this.handleLoadUsers()
    //console.log(jsonData["Users"])
  }

  handleLoadUsers = () => {
    console.log("handle loaders")
    //Firebase.database()
    // .ref('Users/')
    // .on('value', (snapshot) => {
    //   JobsSnapshot = snapshot.val();
    JobsSnapshot = jsonData["Users"]
    let elements;
    // React doesnt accept objects in states so it has to be converted into an array
    for (const index in JobsSnapshot) {
      elements = JobsSnapshot[index];
      peopleArray.push(elements);
    }
    this.setState({
      loading: true,
      listOfPeople: peopleArray
    })
    console.log("home", peopleArray)
    // });

  };
  render() {
    if (true) {
      return (
        <Provider>
          <Router history={browserHistory}>
            <Route path="/" component={Home} />
            <Route path="/categories" component={Categories} userData={peopleArray} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/messages" component={Messages} />
            <Route path='/viewprofile' component={ViewProfile} />
            {/* <Route path='/phonelogin' component={PhoneLogin} /> */}
          </Router>
        </Provider>
      );
    } else {
      return (<Loader />)
    }
  }
}

export default App;
