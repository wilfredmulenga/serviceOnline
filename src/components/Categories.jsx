import React from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Firebase from '../config/firebase';
import Button from '@material-ui/core/Button';
import { browserHistory } from 'react-router';
import Loader from './Loader'

Modal.setAppElement('#root');




//let displayName = 'Anonymous';
//let pic = 'https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png';
// Firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     userUID = user.uid;
//     // Firebase.database().ref(`Users/${userUID}`).on('value', (snapshot) => {
//     //   var data = snapshot.val()
//     //   if (data != null) {
//     //     displayName = `${data.firstName} ${data.lastName}`;
//     //     pic = data.pic
//     //   }
//     // })
//     // newFucn()

//   } else {
//     //comment out and when app loads, takes user to /phonelogin
//     // browserHistory.push({
//     //   pathname: '/phonelogin'
//     // })
//   }
// });


// console.log(newFucn == true)

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      userData: this.props.route.userData,
      userUID: this.props.route.userUID,
      currentUser: this.props.route.currentUser[0]
    };

  }

  render() {
    return (
      <div>
        <Navbar title="Categories" />
        <Tables userData={this.state.userData}
          userUID={this.state.userUID} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPeople: this.props.userData,
      userUID: this.props.userUID,
      job: '',
      selectedPerson: [],
      loading: true,
      typeOfUsers: "Search Results: Featured Workers",
      pic: this.props.currentUser.pic,
      fullName: `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    console.log(this.state.userUID)
  }

  handleConnect = (selectedPersonFirstName, selectedPersonLastName, selectedPersonPic, selectedPersonUserUID) => {
    //console.log("handleConnect", selectedPersonFirstName, selectedPersonLastName, selectedPersonPic, selectedPersonUserUID, this.state.pic)
    var PostRef = Firebase.database()
      .ref(`Users/${this.state.userUID}/Messages`).push()
    var PostRefKey = PostRef.getKey()
    Firebase.database().ref(`Users/${this.state.userUID}/Messages`)
      .push({
        messageKey: PostRefKey,
        name: `${selectedPersonFirstName} ${selectedPersonLastName}`,
        text: "Click here to start chatting",
        profilePicUrl: selectedPersonPic
      })
    Firebase.database().ref(`Users/${selectedPersonUserUID}/Messages`)
      .push({
        messageKey: PostRefKey,
        name: this.state.fullName,
        text: "New Connection",
        profilePicUrl: this.state.pic
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
        }) : null;

    }
    this.openModal();
  };

  openModal() {
    // open and close modal upon clicking
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }



  handleClick = (value) => {

    var filterByProfession = []
    for (var y = 0; y < this.props.userData.length; y++) {
      if (this.props.userData[y]["profession"] === value) {
        filterByProfession.push(this.props.userData[y])
      }
    }
    this.setState({
      listOfPeople: filterByProfession
    })
    console.log(filterByProfession)
    switch (value) {
      case "Maid": this.setState({
        typeOfUsers: "Search Results: Maids"
      })
        break
      case "Electrician": this.setState({
        typeOfUsers: "Search Results: Electrician"
      })
        break
      case "Carpenter": this.setState({
        typeOfUsers: "Search Results: Carpenters"
      })

        break
      default: this.setState({
        typeOfUsers: "Search Results: Featured Workers",
        listOfPeople: this.props.userData
      })

    }
  }



  render() {
    const { listOfPeople } = this.state;
    const { selectedPerson } = this.state;



    return (
      <div className="row container-fluid justify-content-start mt-4 mb-4">
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
            onClick={() => this.handleClick('Maid')}
          >Maid</Button>
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
          <Button
            className="btn  mb-1"
            type="button"
            variant='contained'
            style={{ backgroundColor: '#FFF', color: '#000' }}
            onClick={() => this.handleClick('All')}
          >All</Button>

        </div>
        <div className="card col center-align mr-3 ml-3 ">
          <div className="mt-2 mb-1">{this.state.typeOfUsers}</div>
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
          <div className="row pl-2 mt-4 pr-2">
            {/* {
           listOfPeople.forEach((element,i)=>{
             newArray.push(Object.values(element))
           })

           } */}

            {

              (listOfPeople !== ["empty"]) ? listOfPeople.map((element, i) => (
                <div className="card col-md-6 pt-3 pb-3 " key={i} >
                  <div className="row justify-content-around">
                    <div className="col-md-4 mr-2  justify-content-start">
                      <img
                        className="card-img-top rounded-circle"
                        src={element.pic}
                        style={{ width: 160, height: 160 }}
                        alt={'profile pic'}
                      />
                    </div>
                    <div className="col-md-7  text-align-start">
                      <b>   Name: </b> {`${element.firstName} ${element.lastName}`}<br />

                      <b>  Skills: </b>{(element.skills != undefined) ? `${
                        element.skills.map((element, i) => (
                          element.label
                        ))
                        }` : null} <br />
                      <b> City:</b> {element.city} <br />

                      <Button className='mt-5' variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                        onClick={() => this.handleCardClick(element.userUID)}>View More</Button>
                    </div>

                    {/* Modal when user clicks on a specific person */}
                    {(selectedPerson.firstName !== '' && selectedPerson.lastName !== '' && selectedPerson.age !== ''
                      && selectedPerson.city !== '' && selectedPerson.briefDescription !== '' && selectedPerson.email !== ''
                      && selectedPerson.phoneNumber !== '' && selectedPerson.nrc !== '') ?
                      <Modal
                        isOpen={this.state.modalIsOpen}
                        //style={customStyles}
                        id="modalStyles"
                        contentLabel="Example Modal">
                        <div className="container ">
                          <div className=" row mb-3 justify-content-end"
                          >
                            <Button

                              type="button"
                              onClick={() => this.setState({
                                modalIsOpen: false
                              })}
                              variant='contained'
                              color="secondary">
                              Cancel</Button>
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
                                    onClick={() =>
                                      this.handleConnect(selectedPerson.firstName, selectedPerson.lastName,
                                        selectedPerson.pic, selectedPerson.userUID)}
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
                                      <img className="img-thumbnail mr-2" src={image} alt="gallery of" />
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
              )) : <Loader />}
          </div>
        </div>
      </div >
    );
  }
}

export default Categories;
