import React from 'react';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import { ButtonGroup} from 'react-bootstrap';
import Firebase from '../src/config/firebase';

class Categories extends React.Component {

    render(){
      return <div>
    
      <Navbar title="Categories"/>
      
        <Tables/>
      </div>
    }
  }
  

  var JobsSnapshot;
  var newArray = []
  class Tables extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        listOfPeople: [],
        job : ""
      }
      this.handleClick = this.handleClick.bind(this);
      
    };
   
  
   
    handleClick = (value) => {
      let peopleArray = [];
        
       
      //var jobs = firebase.database().ref('Jobs/'+ value);
      Firebase.database().ref('Jobs/'+ value).on('value',  (snapshot) => {
        JobsSnapshot = snapshot.val();
        var elements;
        var innerElements;
        for(let index in JobsSnapshot){
          elements = JobsSnapshot[index]
          peopleArray.push(Object.values(elements))  
          // for(let index2 in elements){
          //   innerElements = elements[index2]
          //   peopleArray.push(Object.values(innerElements))  
          // }
          
          // console.log(innerElements)
        }
      
        //console.log(peopleArray)
        // JobsSnapshot.forEach((elements, key) => {
        //   peopleArray.push(Object.values(elements))  
        //   //console.log(elements)
        // });
      
        this.setState({
          listOfPeople:peopleArray
        })
       });
      //   console.log(value)
    }
    

	render(){
    const {listOfPeople} = this.state;
		return <div className="row container-fluid justify-content-start mt-4">
    <div className="card col-md-2 ml-3">
      <div className="mt-3 justify-content-center text-center">
        <h5>BROWSE JOBS</h5>
        <hr/>
      <div className="btn-group-vertical container-fluid">
      {/* <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </button> */}
      <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
        <a className="dropdown-item">House Help</a>
      </div>
      <button  type="button" class="btn btn-secondary" onClick={ ()=> this.handleClick("House Cleaner") }>House Cleaner</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Yard Cleaner")}>Yard Cleaner</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Carpenter")}>Carpenter</button>
      {/* <button  type="button" class="btn btn-secondary" onClick={ ()=> this.handleClick("House Cleaner") }>Painter</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Yard Cleaner")}>Mechanic</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Carpenter")}>Hair-Dresser</button>
      <button  type="button" class="btn btn-secondary" onClick={ ()=> this.handleClick("House Cleaner") }>House Cleaner</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Yard Cleaner")}>Yard Cleaner</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Carpenter")}>Carpenter</button>
      <button  type="button" class="btn btn-secondary" onClick={ ()=> this.handleClick("House Cleaner") }>House Cleaner</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Yard Cleaner")}>Yard Cleaner</button>
      <button  type="button" class="btn btn-secondary" onClick={() => this.handleClick("Carpenter")}>Carpenter</button>
      */}
      </div>
      </div>
    </div>
    <div  className="card col center-align mr-3 ml-3" style={{textAlign:"center"}}>
        <div className="input-group mt-3 justify-content-center">
          <input type="text" className="form-control col-6"
           placeholder="I am looking to hire a..."/>
          <span className="input-group-btn">
            <button className="btn btn-default"
          type="button" >Go!</button>
          </span>
        </div>
        <div className="row">
         
         
         {
           listOfPeople.forEach((element,i)=>{
             newArray.push(Object.values(element))
           })
           
           }
         
        {
          newArray.map((element,i) => <div className="card" style={{width:200, margin:20}}  key={i}>
 
              <img className="card-img-top" src= {element[2]["pic"]} alt={"profile pic"}/>
          <h5 className="card-title">  {element[0]["firsName"]}</h5> 
           <p className="card-text"> Profession: {element[1]["profession"]}   <br/>   
             Rating : {element[1]["rating"]} <br/>  
             Status : {element[1]["status"]} <br/>
             City:  {element[0]["city"]}     </p> 
             <button>Reviews</button>
            {console.log(element)}
           </div>
           )
           
        }
        { /*empty the array to avoid repetion of elements*/
          newArray = []}
 
       
        </div> 
      </div>
     
		</div>
  }
}

export default Categories;