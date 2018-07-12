// This is the profile component

import React, { Component } from 'react';
import Navbar from './Navbar';
// import SignIn from './SignIn'
import Chip from '@material-ui/core/Chip';
import greybackground from './greybackground.jpeg';
import Firebase from '../src/config/firebase';
// Firebase
let userUID;
Firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userUID = user.uid;
    console.log(userUID);
    Firebase.database().ref('Jobs/Carpenter').child(userUID).on('value', (snapshot) => {

      // console.log(snapshot.val())
    });
  } else {
    console.log('signed out');
  }
});


// Components
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: true,
      chipData: [
        { label: 'Sowing' },
        { label: 'Plumbing' },
        { label: 'Wood-Work' },

      ],
      input: '',
      selectedFile: ['asa', 'asa'],
      uploadedImages: [],
      file: '',
      imagePreviewUrl: '',
      profilePic: '',
      firstName: '',
      lastName: '',
      age: '',
      nrc: '',
      phoneNumber: '',
      email: '',
      city: '',
      rating: 3,
      status: 'available',
      reviews: [],
      briefDescription: '',
      profession: 'House Cleaner',
      // skills : [],
      // profilePicPreviewUrl is actually base64 of the image
      profilePicPreviewUrl: '',
      // base64 of uploaded Images
      uploadedImagesBase64: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.addItem = this.addItem.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleChangeImages = this.handleChangeImages.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImages = this.handleChangeImages.bind(this);
    this.handleChangeProfilePic = this.handleChangeProfilePic.bind(this);
    this.handleProfessionChange = this.handleProfessionChange.bind(this);
    this.populateInputs = this.populateInputs.bind(this);
    // this.fileChangedHandler = this.fileChangedHandler(this)
    // this.uploadHandler = this.uploadHandler(this)
    // this.handleChange = this.handleChange.bind(this)
  }
  // If user is already signed in. Populate inputs
  populateInputs() {
    if (userUID) {
      console.log(userUID);
    }
  }


  // handle the deletion of a chip
  handleProfessionChange(event) {
    this.setState({ profession: event.target.value });
  }
  //  componentDidUpdate(){
  //   this.handleProfessionChange()
  //  }

  handleDelete = data => () => {
    if (data.label === 'nameOfChip') {
      alert('Why would you want to delete specifc Chip?! :)'); // eslint-disable-line no-alert
      return;
    }
    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.setState({ chipData });
  }

    // handle the addition of a chip
    addItem = () => {
      this.state.chipData.push({ label: this.state.input });
      console.log(this.state.chipData);
      const chipData = [...this.state.chipData];
      this.setState({ chipData });
    }

    handleChangeChips = (event) => {
      event.preventDefault();
      this.setState({
        input: event.target.value,
      });
    }
    // handle uploading an image for "Gallery Of Your Work"
    sendData() {
      // console.log(this.state.profession)
      Firebase.database().ref(`Users/${userUID}`).set({
        pic: this.state.profilePicPreviewUrl,
	  			firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        city: this.state.city,
        age: this.state.age,
        nrc: this.state.nrc,
        profession: this.state.profession,
        skills: this.state.chipData,
        briefDescription: this.state.briefDescription,
        galleryOfWork: this.state.uploadedImagesBase64,

      }, (error) => {
        if (error) {
          console.log('write failed');
        } else {
          console.log('write successful');
        }
      });

      // event.preventDefault();
      // alert(
      //   `Selected file - ${this.fileInput.files[0].name}`
      // );
      // this.state.uploadedImages.push(this.fileInput.files[0])
      // const uploadedImages = [...this.state.uploadedImages]
      // this.setState({uploadedImages})
      // console.log(this.state.uploadedImages)
    }
    handleChangeImages(event) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }

    // profile pic change handler
    handleChangeProfilePic(event) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file,
          profilePicPreviewUrl: reader.result,

        });
      };

      reader.readAsDataURL(file);
    }
  // handle input change except for those that need images
    handleChangeInput(event) {
      if (event.target.placeholder === 'First Name') {
        this.setState({
          firstName: event.target.value,
        });
      } else if (event.target.placeholder === 'Last Name') {
        this.setState({
          lastName: event.target.value,
        });
      } else if (event.target.placeholder === 'Phone Number') {
        this.setState({
          phoneNumber: event.target.value,
        });
      } else if (event.target.placeholder === 'Email') {
        this.setState({
          email: event.target.value,
        });
      } else if (event.target.placeholder === 'City') {
        this.setState({
          city: event.target.value,
        });
      } else if (event.target.placeholder === 'Age') {
        this.setState({
          age: event.target.value,
        });
      } else if (event.target.placeholder === 'NRC Number') {
        this.setState({
          nrc: event.target.value,
        });
      } else if (event.target.placeholder === 'Profession') {
        this.setState({
          profession: event.target.value,
        });
      } else if (event.target.placeholder === 'Brief Description of Profession/ Duties') {
        this.setState({
          briefDescription: event.target.value,
        });
      }
    }

    render() {
      const { uploadedImages } = this.state;
      const { uploadedImagesBase64 } = this.state;
      // Profile Picture Upload
      const { profilePicPreviewUrl } = this.state;
      let $profilePicPreview = null;
      if (profilePicPreviewUrl) {
        $profilePicPreview = (<img src={profilePicPreviewUrl} />);
      } else {
        $profilePicPreview = (<img src={greybackground} />);
      }
      // Gallery of Work Images
      const { imagePreviewUrl } = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
        this.state.uploadedImages.push($imagePreview);
        this.state.uploadedImagesBase64.push(imagePreviewUrl);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
      return (

      <div>
        <Navbar title={'Navbar Page'} loginStatus={userUID }/>
        {
         // this.state.signedIn ?  null   :  <SignIn loginStatus={this.state.signedIn}/>

        }
        <div className="container justify-content-center">

       <div className="card" >
        <div className="card-body">
        <form className="needs-validation" // onSubmit={this.handleSubmit}
>
          <div className="card-title">
            <h3>Update Profile</h3>
          </div>
          <div className="row" style={{ marginBottom: 50 }}>
         <div className="col-md-6">
         {$profilePicPreview}
         </div>
         <div className="col-md-6">
          <h5 className="mb-2">Upload Profile picture</h5>
          <input type="file" className="form-control" onChange={this.handleChangeProfilePic} required/>
          </div>
          </div>
          <h3>Personal Information</h3>
        <div className="mb-5">
            <div className="form-row">
              <div className="col mb-3">
                <input type="text" value={this.state.firstName} onChange={this.handleChangeInput}
                 className="form-control" placeholder="First Name" required/>

              </div>
              <div className="col mb-3">
                <input type="text" value={this.state.lastName} onChange={this.handleChangeInput}
                className="form-control" placeholder="Last Name" required/>
              </div>
            </div>
            <div className="form-row">
              <div className="col mb-3">
                <input type="text" value={this.state.email} onChange={this.handleChangeInput}
                className="form-control" placeholder="Email" required/>
              </div>
              <div className="col mb-3">
                <input type="number" value={this.state.phoneNumber} onChange={this.handleChangeInput}
                 className="form-control" placeholder="Phone Number" required/>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <input type="text" value={this.state.city} onChange={this.handleChangeInput}
                 className="form-control" placeholder="City" required/>
              </div>
              <div className="col-md-3 mb-3">
                <input type="number" value={this.state.age} onChange={this.handleChangeInput}
                 className="form-control" placeholder="Age" required/>
              </div>
              <div className="col-md-3 mb-3">
                <input type="number" value={this.state.nrc} onChange={this.handleChangeInput}
                 className="form-control" placeholder="NRC Number" required/>
              </div>
            </div>
        </div>
        <h3>Professional Information</h3>
        <div className="row">
        <div className="col mb-3">
        <select className="form-control mb-3" id="professionSelect" onChange={this.handleProfessionChange}>
      <option value={'House Cleaner'}>House Cleaner</option>
      <option value={'Yard Cleaner'}>Yard Cleaner</option>
      <option value={'Carpenter'}>Carpenter</option>
      <option value={'Plumber'}>Plumber</option>
      <option value={'Painter'}>Painter</option>
      <option value={'Other'}>Other</option>
    </select>
                {/* <input type="text" value={this.state.profession} onChange={this.handleChangeInput}
                 class="form-control mb-3" placeholder="Profession" /> */}
                <textarea className="form-control"
                value={this.state.briefDescription} onChange={this.handleChangeInput}
                id="exampleFormControlTextarea1" rows="5"
                placeholder="Brief Description of Profession/ Duties" required></textarea>
              </div>
              <div className="col mb-3">
                <div className="input-group">
                <input
                value={this.state.input}
                 onChange={this.handleChangeChips}
                  type="text" className="form-control mb-3" placeholder="Type in a skill e.g  'Painting'" required/>


                <div >
    <button className=" input-group-append btn btn-secondary" onClick={this.addItem} type="button">Add</button>
  </div>
  </div>

                { this.state.chipData.map(data =>
                  <Chip
                  // key={data.key}
                  label={data.label}
                  onDelete={this.handleDelete(data)}/>)

                }

          </div>

        </div>
        <h3>Gallery of Your Work</h3>
        <div className=" mb-3">
        <div className="input-group col-md-6 mb-3">

  <div className="input-group mb-3">
  <div className="custom-file">
    <input type="file" onChange={this.handleChangeImages}
    ref={(input) => {
      this.fileInput = input;
    }}
    className="custom-file-input" id="inputGroupFile04" required/>
    <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
  </div>
  <div className="input-group-append">
    <button // onClick={this.uploadHandler}
    onClick={this.handleSubmit}
    className="btn btn-outline-secondary" type="button">Upload</button>
  </div>
</div>


</div>
        </div>
        {/* <div className="imgPreview">
          {$imagePreview}
        </div> */}
<div className="row col-md-12 mb-5">
{

  uploadedImages.map((element, i) => <div style={{ marginRight: 10 }}>
  {element}
  </div> )

}

</div>


</form>
<div className="col-md-12 text-center">
 {/* To have the page reload after the submit button is pressed put the button inside the form div */}
  <button className="btn btn-success" onClick={this.sendData}// type="submit"
  >Update Profile</button>
  </div>

        </div>
       </div>


       </div>
        </div>
      );
    }
}

export default Profile;
