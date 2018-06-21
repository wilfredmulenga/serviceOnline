import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Navbar from './Navbar';
import { ButtonGroup} from 'react-bootstrap';
import Firebase from '../src/config/firebase';

class Categories extends React.Component {

    render(){
      return <div>
        <div className="container-fluid">
      <Navbar title="Categories"/>
     
    
       
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

  var JobsSnapshot;

  class Tables extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        listOfPeople: [],
        job : "HouseCleaners"
      }
      this.handleClick = this.handleClick.bind(this);
    };

   
    handleClick = (value) => {
      let peopleArray = [];
    
      //var jobs = firebase.database().ref('Jobs/'+ value);
      Firebase.database().ref('Jobs/'+ value).on('value',  (snapshot) => {
        JobsSnapshot = snapshot.val();
        JobsSnapshot.forEach((elements, key) => {
          peopleArray.push(Object.values(elements))  
        });
        this.setState({
          listOfPeople:peopleArray
        })
       });
    }
    

	render(){
    const {listOfPeople} = this.state;
		return <div>
      <div className="row">
      <div>
      <ButtonGroup vertical>
      <Button  color="primary" onClick={ ()=> this.handleClick(this.state.job)}>House Cleaner</Button>
      <Button color="primary" onClick={() => this.handleClick("YardCleaners")}>Yard Cleaner</Button>
      <Button color="primary" onClick={() => this.handleClick("HouseCleaner")}>Carpenter</Button>
      <Button color="primary" onClick={() => this.handleClick("HouseCleaner")}>Plumber</Button>
      <Button color="primary" onClick={() => this.handleClick("HouseCleaner")}>Painter</Button>
      </ButtonGroup>
      
      </div>
     <div className="row">

      {
        listOfPeople.map((element,i) => <Card style={{width:200, margin:20}}  key={i}>
          <img src= {element[1]} alt={"profile pic"}/>
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

export default Categories;