import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import { browserHistory } from 'react-router';
import Button from '@material-ui/core/Button';

let element = '';
let userUID
class ViewProfile extends Component {
    constructor() {
        super()
        this.handleLoad = this.handleLoad.bind(this)
        this.state = {
            listOfPeople: ''
        }
    }
    handleLoad() {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userUID = user.uid;
                console.log(userUID);
                let userPic = document.getElementById('userPic')
                Firebase.database()
                    .ref(`Users/${userUID}`)
                    .on('value', (snapshot) => {
                        const data = snapshot.val()
                        if (data.firstName != null) {
                            this.setState({
                                listOfPeople: data
                            })

                        }
                    });
            } else {
                console.log('signed out');
            }
        });
    }
    componentWillMount() {
        this.handleLoad()
    }
    render() {
        const { listOfPeople } = this.state;
        return (
            <div>
                <Navbar title={'Navbar Page'} />

                <div>

                    {(listOfPeople) ? <div className='mt-5 ml-4'> <div className="row">
                        <div className="col-md-6">
                            <h3 className='mb-5'>Your Profile</h3>
                            <div className="row">
                                <img
                                    className="rounded-circle"
                                    src={listOfPeople.pic}
                                    style={{ width: 160, height: 160 }}
                                    alt={'profile pic'}
                                />
                                <div className="col-md-6 ml-3"><h5>
                                    Name:{`${listOfPeople.firstName} ${listOfPeople.lastName}`}</h5>

                                    <h5>
                                        Skills:{`${listOfPeople.skills.map((element, i) => (
                                            element.label
                                        ))}`} <br /></h5>
                                    <h5>
                                        City: {listOfPeople.city} <br />
                                    </h5>
                                    <Button className="mt-3" variant='contained' color='primary'
                                        onClick={() => browserHistory.push('/messages')}>Messages</Button>

                                </div>
                            </div>
                            <h4 className="mt-4 mb-1">Brief Job Description</h4>
                            {`${listOfPeople.briefDescription}`}
                        </div>
                        <div className="col-md-6">
                            <div>
                                <h4 className="mt-5">Gallery of Work</h4>
                                {listOfPeople.galleryOfWork.map((image, key) => (
                                    <div className="row mb-3" >
                                        <div className="col-md-6">
                                            <img className="img-thumbnail mr-2" src={image} />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                        <div className='mt-5' style={{ textAlign: 'center' }}><Button variant='contained' color='primary'
                            onClick={() => browserHistory.push('/updateprofile')}>Update Profile</Button></div>

                    </div> : <div className="mt-5" style={{ textAlign: 'center' }}><h1>Sign In to View your profile</h1></div>}



                </div>
            </div >
        )
    }
}

export default ViewProfile;