import React, { Component } from 'react';
import Navbar from './Navbar'
import SignIn from './SignIn'
import Chip from '@material-ui/core/Chip';
import greybackground from './greybackground.jpeg'
import jobs from '../src/config/firebase'

//Components
class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      signedIn : true,
      chipData: [
        {  label: 'Sowing' },
        {  label: 'Plumbing' },
        { label: 'Wood-Work' },
      
      ],
      input: "",
      selectedFile: ["asa","asa"],
      uploadedImages : [],
      file: '',
      imagePreviewUrl: '',
      profilePic : '',
      profilePicPreviewUrl : ''
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.addItem  = this.addItem.bind(this)
    this.sendData = this.sendData.bind(this)
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImages = this.handleChangeImages.bind(this)
    this.handleChangeProfilePic = this.handleChangeProfilePic.bind(this)
    //this.fileChangedHandler = this.fileChangedHandler(this)
    //this.uploadHandler = this.uploadHandler(this)
    //this.handleChange = this.handleChange.bind(this)
  }
  //handle the deletion of a chip
  handleDelete = data => () => {
    if (data.label === 'React') {
      alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
      return;
    }
    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.setState({ chipData });  
  }

    //handle the addition of a chip
    addItem = () => {
      
      this.state.chipData.push({"label":this.state.input})
      console.log(this.state.chipData)
      const chipData = [...this.state.chipData];
      this.setState({ chipData });  
    }

    handleChangeChips = (event)=>{
      event.preventDefault();
      this.setState ({
        input: event.target.value
        })
    }
    //handle uploading an image for "Gallery Of Your Work"
    sendData() {
      jobs.ref('Jobs/newJobs').set({
        "userEmail":{
        profilepic : {
					pic : this.state.profilePic
				},
				personalInformation:{
					firsName:"a",
					lastName: "a",
					email:"a",
					phoneNumber:"a",
					city:"a",
					age:"a",
					nrc:"a"
				},
				professionalInformation:{
					profession: "a",
					skills: ["a"],
					briefDescription: "a",
					galleryOfWork: ["a"]
        }
      }
      })
      console.log(this.state.profilePic)
     // event.preventDefault();
      // alert(
      //   `Selected file - ${this.fileInput.files[0].name}`
      // );
      //this.state.uploadedImages.push(this.fileInput.files[0])
      //const uploadedImages = [...this.state.uploadedImages]
      //this.setState({uploadedImages})
      //console.log(this.state.uploadedImages)

    }
    handleChangeImages(event){
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
    }

    //profile pic change handler
    handleChangeProfilePic(event){
      let reader = new FileReader();
      let file = event.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          profilePicPreviewUrl: reader.result,
          profilePic : file
        });
      }
  
      reader.readAsDataURL(file)
      }

  render(){
    const {uploadedImages} = this.state;
     //Profile Picture Upload
    let {profilePicPreviewUrl} = this.state;
    let $profilePicPreview = null;
    if (profilePicPreviewUrl) {
      $profilePicPreview = (<img src={profilePicPreviewUrl} />);
     
    } else {
    $profilePicPreview = (<img src={greybackground}    />);
    }
    //Gallery of Work Images
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
      this.state.uploadedImages.push($imagePreview)
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return(
     
      <div>
        <Navbar title={"Navbar Page"}/>
        {
          this.state.signedIn ?  null   :  <SignIn loginStatus={this.state.signedIn}/>
        
        }
        <div  className="container justify-content-center">

       <div className="card" >
        <div className="card-body">
        <form class="needs-validation" //onSubmit={this.handleSubmit}
>
          <div className="card-title">
            <h3>Sign Up</h3>
          </div>
          <div className="row" style={{marginBottom:50}}>
         <div class="col-md-6">
         {$profilePicPreview}
         </div>
         <div class="col-md-6">
          <h5 class="mb-2">Upload Profile picture</h5>
          <input type="file" class="form-control" onChange={this.handleChangeProfilePic}  />
          </div>
          </div>
          <h3>Personal Information</h3>
        <div class="mb-5">
            <div class="form-row">
              <div class="col mb-3">
                <input type="text" class="form-control" placeholder="First Name" />
                <div class="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div class="col mb-3">
                <input type="text" class="form-control" placeholder="Last Name" />
              </div>
            </div>
            <div class="form-row">
              <div class="col mb-3">
                <input type="text" class="form-control" placeholder="Email" />
              </div>
              <div class="col mb-3">
                <input type="text" class="form-control" placeholder="Phone Number" />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <input type="text" class="form-control" placeholder="City" />
              </div>
              <div class="col-md-3 mb-3">
                <input type="text" class="form-control" placeholder="Age" />
              </div>
              <div class="col-md-3 mb-3">
                <input type="text" class="form-control" placeholder="NRC Number" />
              </div>
            </div>
        </div>
        <h3>Professional Information</h3>
        <div class="row">
        <div class="col mb-3">
                <input type="text" class="form-control mb-3" placeholder="Profession" />
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                placeholder="Brief Description of Profession/ Duties" ></textarea>
              </div>
              <div class="col mb-3">
                <div class="input-group">
                <input 
                value={this.state.input}
                 onChange={this.handleChangeChips}
                  type="text" class="form-control mb-3" placeholder="Type in a skill e.g  'Painting'" />
                

                <div >
    <button class=" input-group-append btn btn-secondary" onClick={this.addItem} type="button">Add</button>
  </div>  
  </div>
               
                { this.state.chipData.map(data => 
                  <Chip
                  //key={data.key}
                  label={data.label}
                  onDelete={this.handleDelete(data)}/>) 
               
                }
           
          </div>

        </div>
        <h3>Gallery of Your Work</h3>
        <div class=" mb-3">
        <div class="input-group col-md-6 mb-3">
  
  <div class="input-group mb-3">
  <div class="custom-file">
    <input type="file" onChange={this.handleChangeImages}
    ref={input => {
      this.fileInput = input;
    }} 
    class="custom-file-input" id="inputGroupFile04" />
    <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
  </div>
  <div class="input-group-append">
    <button //onClick={this.uploadHandler} 
    onClick={this.handleSubmit}
    class="btn btn-outline-secondary" type="button">Upload</button>
  </div>
</div>   


</div>
        </div>
        {/* <div className="imgPreview">
          {$imagePreview}
        </div> */}
<div class="row col-md-12 mb-5">
{
  
  uploadedImages.map((element,i) => <div style={{marginRight:10}}>
  {element}
  </div>
)
  
}

</div>
 
        
</form>     
 <div class="col-md-12 text-center">
  <button class="btn btn-success" onClick={this.sendData}//type="submit"
  >SIGN UP</button>
  </div>
        </div>
       </div>

 
       </div>
        </div>
    )
  }
 
}

export default SignUp;