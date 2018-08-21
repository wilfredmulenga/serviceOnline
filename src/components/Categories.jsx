// this has two components, categories which just houses the navbar and tables components
// and the tables component which houses the body of the page such as the 'browse jobs'
// tab on the left, the autocomplete search bar and where all the content is displayed when the user picks a
// certain profession/job

import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Firebase from '../config/firebase';
import IntegrationAutosuggest from '../IntegrationAutosuggest';
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    // to make the modal scrollable if it is bigger than than the page
    height: '500px',
    overflow: 'scroll',
  },
};

let loginStatus = true;
let userUID;
let displayName = 'Anonymous';
let pic = 'https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png';
Firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userUID = user.uid;
    Firebase.database().ref(`Users/${userUID}`).on('value', (snapshot) => {
      var data = snapshot.val()
      if (data != null) {
        displayName = `${data.firstName} ${data.lastName}`;
        pic = data.pic
      }
    })

  } else {
    //comment out and when app loads, takes user to /phonelogin
    // browserHistory.push({
    //   pathname: '/phonelogin'
    // })
  }
});

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }
  render() {
    return (
      <div>
        <Navbar title="Categories" />
        <Tables />
      </div>
    );
  }
}

let JobsSnapshot;
const newArray = [];
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPeople: [],
      job: '',
      selectedPerson: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleClick('Maid')
  }

  handleConnect = (value) => {
    var PostRef = Firebase.database()
      .ref(`Users/${value}/Messages`).push()
    var PostRefKey = PostRef.getKey()
    Firebase.database().ref(`Users/${value}/Messages`)
      .push({
        messageKey: PostRefKey,
        name: displayName,
        text: "New Message",
        profilePicUrl: pic
      })
    Firebase.database().ref(`Users/${userUID}/Messages`)
      .push({
        messageKey: PostRefKey,
        name: displayName,
        text: "New Message",
        profilePicUrl: pic
      })
      .catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
    //console.log(PostRef.getKey())
    browserHistory.push({
      pathname: '/messages',
      // search: '?the=search',
      state: { messageKey: PostRefKey }
    })
  }

  handleCardClick = (selectedPersonUserID) => {
    for (const item in this.state.listOfPeople) {
      selectedPersonUserID === this.state.listOfPeople[item].userUID
        ? this.setState({
          selectedPerson: this.state.listOfPeople[item],
        })
        : null;
      console.log(this.state.selectedPerson);
    }
    this.openModal();
  };

  openModal() {
    // open and close modal upon clicking
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  handleClick = (values) => {
    const peopleArray = [];

    // var jobs = firebase.database().ref('Jobs/'+ value);
    //when user first visits categories section, they should see search results already
    //this can be of popular professionals or a random section. for now i will set it to house cleaners
    (values) ? values : 'Maid'
    console.log(values)
    Firebase.database()
      .ref('Users/')
      .orderByChild('profession')
      .equalTo(values)
      .on('value', (snapshot) => {
        JobsSnapshot = snapshot.val();
        console.log(JobsSnapshot);
        let elements;
        if (JobsSnapshot == null) {
          this.setState({ listOfPeople: ['empty'] })
          console.log(this.state.listOfPeople)
        } else {
          // React doesnt accept objects in states so it has to be converted into an array
          for (const index in JobsSnapshot) {
            elements = JobsSnapshot[index];
            peopleArray.push(elements);
          }
          this.setState({
            listOfPeople: peopleArray,
          });
        }
        console.log(peopleArray)
      });

  };

  componentWillMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        loginStatus = true
      } else {
        loginStatus = false
      }
    });
  }

  render() {
    const { listOfPeople } = this.state;
    const { selectedPerson } = this.state;
    console.log(loginStatus)
    return ((loginStatus) ?
      <div className="row container-fluid justify-content-start mt-4">
        <div className="card col-md-2 ml-3 d-flex">
          <div className="mt-3 justify-content-start text-center">
            <h5>BROWSE JOBS</h5>
            <hr />
          </div>
          {/* Three sample jobs for demo purposes. list can be as long as desired */}
          <Button
            className="btn  mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('Maid')}>Maid</Button>
          <Button
            className="btn mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('Electrician')}
          >
            Electrician
            </Button>
          <Button
            className="btn  mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('Carpenter')}
          >
            Carpenter
            </Button>

        </div>
        <div className="card col center-align mr-3 ml-3 ">
          {/* <div className="input-group mt-3 row justify-content-center ">
           
            <div className="col-5">
              <IntegrationAutosuggest
                lol={this.state.value}
                onClick={() => alert(this.state.value)}
              />
            </div>
            <div className='col-1 ml-4'>
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={() => {
                    const value = document.getElementById('jobInput').value;
                    console.log(document.getElementById('jobInput').value)
                    this.handleClick(value);
                  }}>
                  Go!
                </button>
              </span>
            </div>
          </div> */}
          <div className="row pl-2 mt-4">
            {/* {
           listOfPeople.forEach((element,i)=>{
             newArray.push(Object.values(element))
           })

           } */}

            {(listOfPeople != ["empty"]) ? listOfPeople.map((element, i) => (
              <div className="card col-md-6 pt-3 pb-3 " key={i} e>
                <div className="row justify-content-start">
                  <div className="col-md-4  justify-content-start">
                    <img
                      className="card-img-top rounded-circle"
                      src={element.pic}
                      style={{ width: 160, height: 160 }}
                      alt={'profile pic'}
                    />
                  </div>
                  <div className="col-md-8  text-align-start">
                    <b>   Name: </b> {`${element.firstName} ${element.lastName}`}<br />

                    <b>  Skills: </b>{`${element.skills.map((element, i) => (
                      element.label
                    ))}`} <br />
                    <b> City:</b> {element.city} <br />

                    <Button className='mt-5' variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                      onClick={() => this.handleCardClick(element.userUID)}>View More</Button>
                  </div>


                  {console.log(selectedPerson.skills, "skills")}
                  {/* Modal when user clicks on a specific person */}
                  {(selectedPerson.firstName != '' && selectedPerson.lastName != '' && selectedPerson.age != ''
                    && selectedPerson.city != '' && selectedPerson.briefDescription != '' && selectedPerson.email != ''
                    && selectedPerson.phoneNumber != '' && selectedPerson.nrc != '') ?
                    <Modal
                      isOpen={this.state.modalIsOpen}
                      style={customStyles}
                      contentLabel="Example Modal">
                      <div clasName="container ">
                        <div className=" row mb-3 justify-content-end"
                        >
                          <Button

                            type="button"
                            onClick={() => this.setState({
                              modalIsOpen: false
                            })}
                            variant='contained'
                            color="secondary">
                            Cancel
            </Button>
                        </div>
                        <div className="row">

                          <div className="col-md-6">
                            <div className="row">
                              <img
                                className="rounded-circle"
                                src={selectedPerson.pic}
                                style={{ width: 160, height: 160 }}
                                alt={'profile pic'}
                              />
                              <div className="col-md-6 ml-3">
                                <b> Name: </b>{`${selectedPerson.firstName} ${selectedPerson.lastName}`}
                                <br />
                                <b> Skills: </b>{(selectedPerson.skills) ? selectedPerson.skills.map((element, i) => (
                                  element.label
                                )) : null} <br />
                                <b> City: </b>{selectedPerson.city} <br />

                                <Button className="mt-3" variant='contained'
                                  style={{ backgroundColor: '#FFF', color: '#000' }}
                                  onClick={() => this.handleConnect(selectedPerson.userUID)}
                                >Connect</Button>
                                {/* </Link> */}
                              </div>
                            </div>
                            <h5 className="mt-4 mb-1">Brief Job Description</h5>
                            {`${selectedPerson.briefDescription}`}
                          </div>
                          <div className="col-md-6">
                            <div>
                              <h5 className="mt-4">Gallery of Work</h5>
                              {(selectedPerson.galleryOfWork) ? selectedPerson.galleryOfWork.map((image, i) => (
                                <div className="row mb-3" key={i}>
                                  <div className="col-md-6">
                                    <img className="img-thumbnail mr-2" src={image} />
                                  </div>

                                </div>
                              )) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal> : null}
                </div>
              </div>
            )) : <div><h1>No search Results</h1></div>}
          </div>
        </div>
      </div > : <div className='justify-content-center mt-5'><h5>Sign In to View Categories</h5></div>
    );
  }
}

export default Categories;
{/* commented out dropdown list of jobs for demo purposes */ }
{/* Personal Service */ }
{/* <div className="dropdown container-fluid mb-1 justify-content-start ">
            <button
              className="btn btn-primary dropdown-toggle-split"
              type="button"
              id="dropdownMenuButton"
              style={{ width: 160 }}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Personal Service
            </button>
            <div className="dropdown-menu flex-grow-1" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => this.handleClick('House Cleaner')}>
                Waiters & Waitresses
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Bartenders
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Shop Assistants
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Security Guards
              </a>
              <a
                className="dropdown-item"
                value={'action'}
                onClick={() => this.handleClick('House Cleaner')}>
                {' '}
                House Cleaners
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Shop Assistants
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Gardeners
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Babysitters
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Caretakers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Travel Agent
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Retail-Estate Agent
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Wedding Planner
              </a>
            </div>
          </div>
          {/* Transportation */}
{/* <div className="dropdown container justify-content-start mb-1">
            <button
              className="btn btn-primary dropdown-toggle-split"
              type="button"
              id="dropdownMenuButton"
              style={{ width: 160 }}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Transportation
            </button>
            <div className="dropdown-menu disabled" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => this.handleClick('Carpenter')}>
                Drivers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Deliverers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Taxi-Drivers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Bus-Drivers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Maid
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Bus-Conductors
              </a>
            </div>
          </div> */}
{/* Fashion */ }

{/* <div className="dropdown container justify-content-start mb-1">
            <button
              className="btn btn-primary dropdown-toggle-split"
              type="button"
              id="dropdownMenuButton"
              style={{ width: 160 }}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Fashion
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => this.handleClick('House Cleaner')}>
                Hairdressers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Barber Men
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Makeup Artists
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Models
              </a>

              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Fashion Designers
              </a>
            </div>
          </div> */}
{/* IT */ }
{/* <div className="dropdown container justify-content-start mb-1">
            <button
              className="btn btn-primary dropdown-toggle-split"
              type="button"
              id="dropdownMenuButton"
              style={{ width: 160 }}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              IT
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => this.handleClick('House Cleaner')}>
                IT Technicians
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Front-End Developers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Back-End Developers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Web Designers
              </a>
              <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                {' '}
                Graphics Designers
              </a>
            </div> */}

{/* Entertainment */ }
{/* <div className="dropdown container justify-content-start mb-1">
                <button
                  className="btn btn-primary dropdown-toggle-split"
                  type="button"
                  id="dropdownMenuButton"
                  style={{ width: 160 }}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Entertainment
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={() => this.handleClick('House Cleaner')}>
                    Actors & Actresses
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    News Presenters
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    News Writers
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    Reporters
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    Bloggers
                  </a>
                  <a className="dropdown-item" onClick={() => this.handleClick('House Cleaner')}>
                    Script-Writers
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    Producers
                  </a>
                </div>
              </div> */}
{/* Music */ }
{/* <div className="dropdown container justify-content-start mb-1">
                <button
                  className="btn btn-primary dropdown-toggle-split"
                  type="button"
                  id="dropdownMenuButton"
                  style={{ width: 160 }}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Music
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={() => this.handleClick('House Cleaner')}>
                    Singers
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    Dancers
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    Performers
                  </a>
                  <a className="dropdown-item" value={'action'} onClick={() => this.handleClick}>
                    {' '}
                    Rappers
                  </a>
                </div>
              </div> */}
{/* Art */ }
{/* <div className="dropdown container justify-content-start mb-1">
              <button
                className="btn btn-primary  dropdown-toggle-split"
                type="button"
                id="dropdownMenuButton"
                style={{ width: 160 }}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Art
                </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() => this.handleClick('House Cleaner')}>
                  Artists
                  </a>
              </div>
            </div> 
          </div> */}