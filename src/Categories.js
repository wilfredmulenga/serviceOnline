import React from 'react';
import Button from '@material-ui/core/Button';
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
  var newArray = []
  class Tables extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        listOfPeople: [],
        job : "Painter"
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
       console.log(value)
    }
    

	render(){
    const {listOfPeople} = this.state;
		return <div>
      <div className="row">
      <div>
      <ButtonGroup vertical>
      <Button  color="primary"  onClick={ ()=> this.handleClick("House Cleaner") }>House Cleaner</Button>
      <Button color="primary" onClick={() => this.handleClick("Yard Cleaner")}>Yard Cleaner</Button>
      <Button color="primary" onClick={() => this.handleClick("Carpenter")}>Carpenter</Button>
     
      </ButtonGroup>
      
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
            City:  {element[0]["city"]}     </p>
           {/* {console.log(element)} */}
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