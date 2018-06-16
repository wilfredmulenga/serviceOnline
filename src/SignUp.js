import React, { Component } from 'react';
import profilepic from './profilepic.jpeg'
import Navbar from './Navbar'
import SignIn from './SignIn'
import Chip from '@material-ui/core/Chip';


class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      signedIn : true,
      chipData: [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
      ]
    }
    this.handleDelete = this.handleDelete.bind(this)
  }
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
  render(){
    return(
      <div>
        <Navbar title={"Navbar Page"}/>
        {
          this.state.signedIn ?  null   :  <SignIn loginStatus={this.state.signedIn}/>
        
        }
        <div  className="container justify-content-center">
       <div className="card" >
        <div className="card-body">
          <div className="card-title">
            <h3>Sign Up</h3>
          </div>
          <div className="row" style={{marginBottom:50}}>
          <img src={profilepic} alt="some picture" class="img-thumbnail" style={{marginRight:100}}/>
          <h5>Upload Profile picture</h5>
          </div>
          <h3>Personal Information</h3>
        <form class="mb-5">
            <div class="form-row">
              <div class="col mb-3">
                <input type="text" class="form-control" placeholder="First Name" />
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
        </form>
        <h3>Professional Information</h3>
        <form class="form-row">
        <div class="col mb-3">
                <input type="text" class="form-control mb-3" placeholder="Profession" />
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                placeholder="Brief Description of Profession/ Duties"></textarea>
              </div>
              <div class="col mb-3">
             
                <input type="text" class="form-control mb-3" placeholder="Type in a skill e.g  'Painting'" />
                { this.state.chipData.map(data => 
                  <Chip
                  key={data.key}
                  label={data.label}
                  onDelete={this.handleDelete(data)}/>) 
               
                }
                <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Button</button>
  </div>
          </div>

        </form>
        
         
        </div>
       </div>
       </div>
        </div>
    )
  }
 
}

export default SignUp;