import React from 'react';
import { browserHistory } from 'react-router';
import Firebase from '../config/firebase';
import landingPage from '../images/landingPage.jpeg';
import workingIcon from '../images/icons8-work-light-100.png'
import handIcon from '../images/icons8-handshake-100.png'
import workerIcon from '../images/icons8-workers-100.png'
import Navbar from './Navbar';
import Loader from './Loader';






class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      listOfPeople: ["users"]
    }
    //this.handleLoadUsers = this.handleLoadUsers.bind(this)
    //this.handleLoadUsers()
  }

  // handleLoadUsers = () => {
  //   console.log("handle loaders")
  //   Firebase.database()
  //     .ref('Users/')
  //     .on('value', (snapshot) => {
  //       JobsSnapshot = snapshot.val();
  //       let elements;
  //       // React doesnt accept objects in states so it has to be converted into an array
  //       for (const index in JobsSnapshot) {
  //         elements = JobsSnapshot[index];
  //         peopleArray.push(elements);
  //       }
  //       this.setState({
  //         loading: true,
  //         listOfPeople: peopleArray
  //       })
  //       console.log("home", peopleArray)
  //     });

  // };

  render() {


    return (
      <div>
        <div id="home">
          <Navbar userData={"some data"} />
          <div>
            <img
              src={landingPage} // style={{width:"1520px"}}
              className={'img-fluid'}
              alt="landing page" />
            <div style={{
              position: 'absolute', bottom: 0, width: '100%', height: '70%',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 30, color: '#fff', float: 'left', marginLeft: '20px', fontStyle: 'oblique' }}>Helping you get the right service</p></div>
          </div>
          <div className="container">
            {/* How it Works section */}
            <div className="mt-5 flex mb-5" style={{ textAlign: 'center' }}>
              <h3 className="titles">How It Works</h3>
              <div className="row d-flex justify-content-between">
                <div className="col-4">
                  <img src={workingIcon} alt="working icon" />
                  <div className="card mt-3">
                    <h5 className="card-title mt-3">I want to get hired</h5>
                    <p className="card-text">
                      Our platform creates lets people who are not in the formal sector be able to list their skills and services thus opening up the window that has been overlooked by other Job-listing sites. Whether you are a Carpenter, Welder, Barberman, this site will help bring the customers to you.
                </p>
                  </div>
                </div>
                <div className=" col-4 ">
                  <img src={workerIcon} alt='worker icon' />
                  <div className='card mt-3'>
                    <h5 className="card-title mt-3">I want to hire someone</h5>
                    <p className="card-text">
                      Looking for a good hairdresser but just don't know where to look. Or maybe your Kitchen needs some remodeling. Our platform lists the very best professionals in the informal job sector, skilled for the job you may require. Feel free to browse through our category section to get started.
                </p>
                  </div>
                </div>

                <div className="col-4">
                  <img src={handIcon} alt="hand icon" />
                  <div className="card mt-3">
                    <h5 className="card-title mt-3">I want to be a Partner</h5>
                    <p className="card-text">
                      We are always looking for ways to improve our platform and from new angles or ideas. We feel that people with informal jobs could use a platform that is taylored specifically for them to showcase their work. If you share the same passion as well do, we would be happy to hear from you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* About */}
            <div className="row">
              <div className="col-6">

              </div>

            </div>
          </div>
        </div>
      </div >)
  }

}


export default Home;
