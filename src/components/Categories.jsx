// this has two components, categories which just houses the navbar and tables components
// and the tables component which houses the body of the page such as the 'browse jobs'
// tab on the left, the autocomplete search bar and where all the content is displayed when the user picks a
// certain profession/job

import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';
import Firebase from '../config/firebase';
import IntegrationAutosuggest from '../IntegrationAutosuggest';

import Modal from 'react-modal';

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
  }

  handleCardClick = (selectedPersonUserID) => {
    for (const item in this.state.listOfPeople) {
      selectedPersonUserID == this.state.listOfPeople[item].userID
        ? this.setState({
          selectedPerson: this.state.listOfPeople[item],
        })
        : null;
      console.log(this.state.listOfPeople[0].userID);
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
    (values) ? values : 'House Cleaner'
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
      });

  };

  componentWillMount() {
    // this.handleClick('House Cleaner')
  }

  render() {
    const { listOfPeople } = this.state;
    const { selectedPerson } = this.state;
    return (
      <div className="row container-fluid justify-content-start mt-4">
        <div className="card col-md-2 ml-3 d-flex">
          <div className="mt-3 justify-content-start text-center">
            <h5>BROWSE JOBS</h5>
            <hr />
          </div>
          {/* Personal Service */}
          <div className="dropdown container-fluid mb-1 justify-content-start ">
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
          <div className="dropdown container justify-content-start mb-1">
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
          </div>
          {/* Fashion */}

          <div className="dropdown container justify-content-start mb-1">
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
          </div>
          {/* IT */}
          <div className="dropdown container justify-content-start mb-1">
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
            </div>
          </div>
          {/* Entertainment */}
          <div className="dropdown container justify-content-start mb-1">
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
          </div>
          {/* Music */}
          <div className="dropdown container justify-content-start mb-1">
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
          </div>
          {/* Art */}
          <div className="dropdown container justify-content-start mb-1">
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
        </div>
        <div className="card col center-align mr-3 ml-3 " style={{ textAlign: 'center' }}>
          <div className="input-group mt-3 row justify-content-center ">
            {/* <input type="text" className="form-control col-6"
           placeholder="I am looking to hire a..."/> */}
            <div className="col-5">
              <IntegrationAutosuggest
                lol={this.state.value}
                onClick={() => alert(this.state.value)}
              />
            </div>
            <div>
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={() => {
                    const value = document.getElementsByClassName('MuiInput-input-17')['0'].value;

                    this.handleClick(value);
                  }}>
                  Go!
                </button>
              </span>
            </div>
          </div>
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
                  <div className="col-md-4  text-align-left">
                    Name:<br />
                    Rating:<br />
                    Skills: <br />
                    City: <br />
                    Status: {i} <br />
                    <button onClick={() => this.handleCardClick(element.userID)}>View More</button>
                  </div>
                  <div className="col-md-4 align-items-start">
                    <p>
                      {element.firstName}
                      <br />
                      {element.rating}
                      <br />Crafting<br />
                      {element.city}
                      <br />Available<br />
                    </p>
                  </div>

                  {console.log(selectedPerson)}
                  {/* Modal when user clicks on a specific person */}

                  <Modal
                    isOpen={this.state.modalIsOpen}
                    style={customStyles}
                    contentLabel="Example Modal">
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
                            Name:{selectedPerson.firstName}
                            <br />
                            Rating:<br />Skills: <br />City: <br />Status: <br />
                            <Link
                              to={{
                                pathname: '/messages',
                                state: { selectedPersonUserUID: selectedPerson.userUID },
                              }}>
                              {' '} {console.log(selectedPerson.userID)}
                              <button >Connect</button>
                            </Link>
                          </div>
                        </div>
                        <h5 className="mt-4">Reviews</h5>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <h5 className="mt-4">Gallery of Work</h5>
                          {/* {element.galleryOfWork.map((image, key) => (
                            <div className="row mb-3" key={i}>
                              <div className="col-md-6">
                                <img className="img-thumbnail mr-2" src={image} />
                              </div>
                              <div>"captions of work"</div>
                            </div>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            )) : <div><h1>No search Results</h1></div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
