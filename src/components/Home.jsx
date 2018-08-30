import React, { Fragment } from 'react';
import landingPage from '../images/landingPage.jpeg';
import workingIcon from '../images/icons8-work-light-100.png';
import handIcon from '../images/icons8-handshake-100.png';
import workerIcon from '../images/icons8-workers-100.png';
import Navbar from './Navbar';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div id="home" style={{ backgroundColor: '#ECEFF1', width: '100%' }}>
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
              <p style={{ fontSize: 30, color: '#fff', float: 'left', marginLeft: '20px', fontStyle: 'oblique' }}>Getting you connected...</p></div>
          </div>
          <div className="container">
            {/* How it Works section */}
            <div className="mt-5 flex mb-5" style={{ textAlign: 'center' }}>

              <h3 className="titles" style={{ color: '#707070' }}>How It Works</h3>
              <hr />

              <div className="row d-flex justify-content-between">
                <div className="col-4">
                  <img src={workingIcon} alt="working icon" />
                  <div className="card mt-3">
                    <h5 className="card-title mt-3">I want to get hired</h5>
                    <p className="card-text">
                      Nchito lets people who are not in the formal sector to list their skills and services they can offer, therefore,opening up the window that has been overlooked by other Job-listing sites. Whether you are a Carpenter, Welder, Barberman, mechanic, Nchito connects you to a wide network of people looking for such services.
                </p>
                  </div>
                </div>
                <div className=" col-4 ">
                  <img src={workerIcon} alt="worker icon" />
                  <div className="card mt-3">
                    <h5 className="card-title mt-3">I want to hire someone</h5>
                    <p className="card-text">
                      Looking for a good hairdresser but just don't know where to look. Or maybe your Kitchen needs some remodeling or you vehicle needs servicing. Nchito lists the very best professionals in the informal job sector, skilled for the job you may require. Browse the category section to get started.
                </p>
                  </div>
                </div>

                <div className="col-4">
                  <img src={handIcon} alt="hand icon" />
                  <div className="card mt-3">
                    <h5 className="card-title mt-3">I want to be a Partner</h5>
                    <p className="card-text">
                      We are always looking for ways to improve our platform and from new angles or
                      ideas. We feel that people with informal jobs could use a platform that is
                      taylored specifically for them to showcase their work. If you share the same
                      passion as well do, we would be happy to hear from you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* About */}
            <div className="row">
              <div className="col-6" />
            </div>
          </div>

          <div class="content container-fluid" style={{ maxHeight: '20%', opacity: '0.8', background: '#1d1b2a', color: 'white', fontSize: '.8em', padding: '20px 5px 10px 0' }}>
            <div class="row">
              <div class="col-sm-12">
                <p style={{ paddingLeft: '500px' }}>Copyrights &copy; 2018 <a href="#">Nchito</a>. All rights reserved.</p>
              </div>

            </div>
          </div>
        </div>


      </div >)
  }
}
export default Home;
