import React, { Component, Fragment } from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import { Link, browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { UserContext } from './UserContext';
import Loader from '../components/Loader'

let userUID
class ViewProfile extends Component {
    constructor(props) {
        super(props)
        this.handleLoad = this.handleLoad.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        this.state = {
            listOfPeople: ''
        }
    }
    handleLoad() {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userUID = user.uid;
                //console.log(userUID);

                Firebase.database()
                    .ref(`Users/${userUID}`)
                    .on('value', (snapshot) => {
                        const data = snapshot.val()

                        if (data && !data.userUID) {
                            browserHistory.push('/updateprofile')

                        } else {
                            // this update to states will not be called properly 
                            // because the component is not yet mmounted at this point
                            this.setState({
                                listOfPeople: snapshot.val()
                            })
                        }
                    });
            } else {
                console.log('signed out')
            }
        });
    }

    handleSignOut() {

        Firebase.auth().signOut();
        browserHistory.push('/');
    }

    // UNSAFE_componentWillMount() {
    //     this.handleLoad()
    // }
    componentDidMount() {
        this.handleLoad();
    }

    render() {
        const { listOfPeople } = this.state;

        return (
            <UserContext.Consumer>

                {
                    user => ( // use the user wherever you want
                        <Fragment>

                            <Navbar title={'Navbar Page'} />
                            <div className="row container-fluid justify-content-start mt-4">
                                <div className="card col-md-2 ml-3 d-flex">
                                    <div className="justify-content-start text-center">
                                        <h3 className='mb-3'>Account </h3>
                                    </div>

                                    <Button variant='contained'
                                        className="btn  mb-1"
                                        style={{
                                            backgroundColor: '#FFF',
                                            color: '#000'
                                        }}
                                        onClick={() => browserHistory.push('/updateprofile')}
                                    >Update Profile
                            {/* <Link to={{
                            pathname: '/updateprofile',
                            state: { userDetails: listOfPeople }
                        }} >Update Profile</Link> */}
                                    </Button>
                                    <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                        onClick={() => browserHistory.push('/messages')}>Messages</Button>
                                    <Button className="btn  mb-1" variant='contained' style={{ backgroundColor: '#FFF', color: '#000' }}
                                        onClick={() => this.handleSignOut}>Log Out</Button>
                                </div>

                                <div className="card col center-align mr-3 ml-3">
                                    {(listOfPeople) ? <div className='container' >
                                        <h3 className='mb-3'>Your Profile</h3>
                                        <div className="d-flex justify-content-center ">


                                            <div style={{ textAlign: 'center' }}>
                                                <img
                                                    className="rounded-circle"
                                                    src={listOfPeople.pic}
                                                    style={{ width: 160, height: 160 }}
                                                    alt={'profile pic'}
                                                /> <br />

                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className=" col-lg-6 col-md-6 ">
                                                <h4>Personal Details</h4>
                                                <b>
                                                    Name:</b>{`${listOfPeople.firstName} ${listOfPeople.lastName}`}
                                                <br />
                                                <b>Profession: </b>{listOfPeople.profession} <br />

                                                <b>
                                                    City: </b>{listOfPeople.city} <br />


                                                <h4 className="mt-4 mb-1">Job Details</h4>
                                                <b>
                                                    Skills: </b>{`${listOfPeople.skills.map((element, i) => (
                                                        element.label
                                                    ))}`} <br />


                                                <b>Job Desciption: </b>{`${listOfPeople.briefDescription}`}
                                            </div>
                                            <div className=" col-lg-6 col-md-6 ">
                                                <h4>Gallery of Work</h4>
                                                {listOfPeople.galleryOfWork.map((image, i) => (
                                                    <div key={i} className="row mb-3" >
                                                        <div className="col-md-6">
                                                            <img className="img-thumbnail mr-2" alt=" gallery of work" src={image} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='mt-5' style={{ textAlign: 'center' }}>


                                        </div></div> : Loader}
                                </div>
                            </div>

                        </Fragment>
                    )
                }
            </UserContext.Consumer>
        )
    }
}



export default ViewProfile;