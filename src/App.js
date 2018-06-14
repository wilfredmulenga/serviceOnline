import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { ButtonGroup , Well} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import landingPage from './landingPage.jpeg';
import firebase from 'firebase';
import { join } from 'path';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
//import {Button} from 'mdbreact'

/*Components*/

class HomeCard extends React.Component {
  render() {
    return <div className="col-md-4"><h4>{this.props.title}</h4>
                <p>{this.props.text}</p>
            </div>;
  }
}
/*we can use default props to set the initial value of the jobs that load when the page opens*/


var config = {
  apiKey: "AIzaSyDWHKJFtKRsA_YpQMjfnyL4dbUdttkn9Xo",
  authDomain: "lsk-guide-jobs.firebaseapp.com",
  databaseURL: "https://lsk-guide-jobs.firebaseio.com",
  projectId: "lsk-guide-jobs",
  storageBucket: "",
  messagingSenderId: "319224351068"
};
firebase.initializeApp(config);
var database = firebase.database();
var JobsSnapshot;

class Tables extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        fullname: [],
        profession: "",
        location: "",
        wages : "",
        rating : "",
        job : "HouseCleaners"
      }
      this.handleClick = this.handleClick.bind(this);
    };

   
    handleClick = (value) => {
    
     var newJob;
     var html = "";
      var fullname = "";
      var profession = "";
      var location = "";
      var wages = "";
      var rating = "";
      let names = [];
    
      var jobs = firebase.database().ref('Jobs/'+ value);
      jobs.on('value',  (snapshot) => {
        JobsSnapshot = snapshot.val();
  
     
        JobsSnapshot.forEach((elements, key) => {

        names.push(Object.values(elements))  
        console.log(names)
        });
        this.setState({
          fullname:names
        })

       });
      

       
      
    
    }
    

	render(){
    const {fullname} = this.state;
    const { spacing } = this.state;
		return <div>
      <div className="row">
      <div>
      <ButtonGroup vertical>
      <Button  onClick={ ()=> this.handleClick(this.state.job)}>House Cleaner</Button>
      <Button onClick={() => this.handleClick("YardCleaners")}>Yard Cleaner</Button>
      <Button onClick={() => this.handleClick("HouseCleaner")}>Carpenter</Button>
      <Button onClick={() => this.handleClick("HouseCleaner")}>Plumber</Button>
      <Button onClick={() => this.handleClick("HouseCleaner")}>Painter</Button>
      </ButtonGroup>
      <Button color="secondary" >
        Secondary
      </Button>
      </div>
     <div className="row" spacing={16}>

      {
        fullname.map((element,i) => <Card style={{width:200, margin:20}}  key={i}>
          <img src= {element[1]}/>
         Fullname: {element[0]}          
          Location:  {element[2]} 
         Profession: {element[3]} 
        Rating: {element[4]}
        Wages: {element[5]} 
        </Card>)
       
       }
       </div>
        
    
      
       
     
      </div>
		</div>
  }
}


  

/*Pages*/
const Page = ({ title }) => (
    <div className="App container-fluid">
       {/*Navbar section*/}
   <div className="App-header">
   <div className="row">
   <img src={logo} className="App-logo" alt="logo" />
   <h4><Link to="/">Home</Link></h4>
   <h4><Link to="/about">About</Link></h4>
   <h4><Link to="/categories">Categories</Link></h4>
   <h4><Link to="/login">Log In/Sign Up</Link></h4>
   <h4 className="App-intro">
        This is the {title} page.
      </h4>
  </div>
  </div>
        
    </div>
    
);

const Home = (props) => (
  
  <div>
    <Page title="Home"/>
 {/*Landing Page Image section*/}
  <div className="landingPageImage">
   <img src={landingPage} style={{width:"1520px"}} alt="landing page" />
  </div>
  {/*How it Works section*/}
  <div style={{textAlign:"center"}}>
    <h3 className="titles">How It Works</h3>
    <div className="row container-fluid">
   <HomeCard title="I want to get hired" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
   <HomeCard title="I want to hire someone" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
   <HomeCard title="I want to be a partner" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
    </div>
   
  </div>
  
  </div>
  
);

const About = (props) => (
  <Page title="About"/>
);

class Categories extends React.Component {

  render(){
    return <div>
      <div className="container-fluid">
    <Page title="Categories"/>
   
  
     
      </div>
      <div  className="center-align" style={{textAlign:"center"}}>
      <div className="col-lg-6 ">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search for..."/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" >Go!</button>
        </span>
      </div>
      </div>
      <Tables />
    
    </div>
    </div>
  }
}
  
  
  

const Login = (props) =>(
  <div>
  <Page title="Login"/>
  
  </div>
);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/login" component={Login}/>
      </Router>
    );
  }
}

export default App;