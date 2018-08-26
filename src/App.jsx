import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './styles/App.css';
import Categories from './components/Categories';
import Home from './components/Home';
import Messages from './Messages/Messages';
import ViewProfile from './Accounts/ViewProfile';
import UpdateProfile from './Accounts/UpdateProfile';
import SignIn from './Accounts/SignIn';
import SignUp from './Accounts/SignUp';
import Firebase from './config/firebase';
import Loader from './components/Loader';
import jsonData from './database/NchitoUserDatabase.json';

const peopleArray = [];
const currentUser = [];
let userUID;
let JobsSnapshot;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      listOfPeople: [],
    };
    this.handleLoadUsers = this.handleLoadUsers.bind(this);
    this.handleLoadUsers();
    // console.log(jsonData["Users"])
  }
  // fetching data from firebase or json in ./database folder
  handleLoadUsers = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // handleLoadUsers()
        userUID = user.uid;
        console.log(userUID);
      } else {
        browserHistory.push('/signin');
      }
    });
    Firebase.database()
      .ref('Users/')
      .on('value', (snapshot) => {
        JobsSnapshot = snapshot.val();
        // JobsSnapshot = jsonData["Users"]
        let elements;
        // React doesnt accept objects in states so it has to be converted into an array
        for (const index in JobsSnapshot) {
          elements = JobsSnapshot[index];
          peopleArray.push(elements);
        }
        let currentUserObject;
        for (const index in JobsSnapshot) {
          // console.log(JobsSnapshot[index]['userUID'])

          if (
            JobsSnapshot[index].userUID === userUID
            // 'O6VVUA0fm1QpOt23QaOctFux27h1'
          ) {
            currentUserObject = JobsSnapshot[index];
          }
        }

        currentUser.push(currentUserObject);

        this.setState({
          loading: true,
          listOfPeople: peopleArray,
        });
        // console.log("home", peopleArray)
      });
  }
  render() {
    if (this.state.loading) {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route
            path="/categories"
            component={Categories}
            userData={peopleArray}
            userUID={userUID}
          />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/updateprofile"
            component={UpdateProfile}
            userData={currentUser}
            userUID={userUID}
          />
          <Route path="/messages" component={Messages} userUID={userUID} />
          <Route
            path="/viewprofile"
            component={ViewProfile}
            userData={currentUser}
            userUID={userUID}
          />
          {/* <Route path='/phonelogin' component={PhoneLogin} /> */}
        </Router>
      );
    }
    return <Loader />;
  }
}

export default App;
