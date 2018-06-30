import React from 'react';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import { ButtonGroup} from 'react-bootstrap';
import Firebase from '../src/config/firebase';
import IntegrationAutosuggest from './IntegrationAutosuggest'

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
        console.log(value)
       
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
    <div className="card col-md-2 ml-3 d-flex">
      <div className="mt-3 justify-content-start text-center">
        <h5>BROWSE JOBS</h5>
        <hr/>
        </div>
        {/* Personal Service */}
     <div class="dropdown container-fluid mb-1 justify-content-start " >
  <button class="btn btn-primary dropdown-toggle-split" type="button" id="dropdownMenuButton" 
    style={{width:160}}
     data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Personal Service
  </button>
  <div className="dropdown-menu flex-grow-1"  aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")} >Waiters & Waitresses</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Bartenders</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick} > Shop Assistants</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Security Guards</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Maid</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick} > Shop Assistants</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Gardeners</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick} > Babysitters</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Caretakers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Travel Agent</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Retail-Estate Agent</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick} > Wedding Planner</a>
  </div>
</div>
{/* Transportation */}
<div class="dropdown container justify-content-start mb-1">
  <button class="btn btn-primary dropdown-toggle-split" type="button" id="dropdownMenuButton" style={{width:160}}
   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
    Transportation
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")} >Drivers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Deliverers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Taxi-Drivers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Bus-Drivers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Maid</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Bus-Conductors</a>
  </div>
</div>
  {/* Fashion */}

 <div class="dropdown container justify-content-start mb-1">
  <button class="btn btn-primary dropdown-toggle-split" type="button" id="dropdownMenuButton" style={{width:160}}
   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
    Fashion
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")} >Hairdressers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Barber Men</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Makeup Artists</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick} > Models</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Maid</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Fashion Designers</a>
  </div>
</div>
{/* IT */}
<div class="dropdown container justify-content-start mb-1">
  <button class="btn btn-primary dropdown-toggle-split" type="button" id="dropdownMenuButton" style={{width:160}}
   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
    IT
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")}>IT Technicians</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Front-End Developers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Back-End Developers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Web Designers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Graphics Designers</a>
    
  </div>
</div>
{/* Entertainment */}
<div class="dropdown container justify-content-start mb-1">
  <button class="btn btn-primary dropdown-toggle-split" type="button" id="dropdownMenuButton" style={{width:160}}
   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
    Entertainment
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")} >Actors & Actresses</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > News Presenters</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > News Writers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Reporters</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Bloggers</a>
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")} >Script-Writers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Producers</a>   
  </div>
</div>
{/* Music */}
<div class="dropdown container justify-content-start mb-1">
  <button class="btn btn-primary dropdown-toggle-split" type="button" id="dropdownMenuButton" style={{width:160}}
   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
    Music
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")} >Singers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Dancers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Performers</a>
    <a class="dropdown-item" value={"action"} onClick={ () => this.handleClick}  > Rappers</a>  
  </div>
</div>
{/* Art */}
<div class="dropdown container justify-content-start mb-1">
  <button class="btn btn-primary  dropdown-toggle-split" type="button" id="dropdownMenuButton"  style={{width:160}}
   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Art
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item"   onClick={ () => this.handleClick("House Cleaner")} >Artists</a>
  </div>
</div>
    </div>
    <div  className="card col center-align mr-3 ml-3 " style={{textAlign:"center"}}>
        <div className="input-group mt-3 row justify-content-center ">
          {/* <input type="text" className="form-control col-6"
           placeholder="I am looking to hire a..."/> */}
          <div className="col-5">
          <IntegrationAutosuggest/>
          </div>
          <div>
          <span className="input-group-btn">
            <button className="btn btn-default"
          type="button" >Go!</button>
          </span>
          </div>
        </div>
        <div className="row pl-2 mt-4">
         
         
         {
           listOfPeople.forEach((element,i)=>{
             newArray.push(Object.values(element))
           })
           
           }
         
        {
          newArray.map((element,i) => <div className="card col-md-6 pt-3 pb-3">
          <div className="row justify-content-start"   key={i}>
            <div className="col-md-4  justify-content-start"><img className="card-img-top rounded-circle" src= {element[2]["pic"]}
            style={{width:160,height:160}} alt={"profile pic"}/></div>
            <div className="col-md-4  text-align-left">Name:<br/>
                                   Rating:<br/>
                                   Skills: <br/>
                                   City: <br/>
                                   Status: <br/>
                                   <button>Reviews</button></div>
            <div className="col-md-4 align-items-start"> 
            <p>{element[0]["firstName"]}<br/>{element[1]["rating"]}<br/>Crafting<br/>{element[0]["city"]}<br/>Available<br/></p>
                                    </div>         
            {console.log(element)}
           </div>
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