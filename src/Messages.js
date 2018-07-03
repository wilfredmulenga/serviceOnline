//Overlay component to where people chat
import React from 'react';
import Navbar from './Navbar';
import Firebase from '../src/config/firebase';
const customStyles = {
    content : {
        width : "200px",
        height : "100px",
        color : "grey",
        absolute : {
            position : 'absolute'
        }
    }
}

Firebase.auth().onAuthStateChanged(function(user){
    if(user){
      console.log("signed in")
      
    }else{
      console.log("signed out")
    }
  })

 
 
class Messages extends React.Component {
    constructor(){
        super()
        this.LoadMessages = this.LoadMessages.bind(this)
        this.displayMessage = this.displayMessage.bind(this)

        this.messageSubmit = this.messageSubmit.bind(this);
    }
    componentWillMount(){
        this.LoadMessages()
    }

    LoadMessages = () => {
        var setMessage = function(snap) {
            var data = snap.val();
            this.displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
          }.bind(this);
          Firebase.database().ref('messages/').limitToLast(12).on('child_added', setMessage);
          Firebase.database().ref('messages/').limitToLast(12).on('child_added', setMessage);
         
      }
    
      displayMessage = (key, name, text, picUrl, imageUrl) => {
        var div = document.getElementById("messages");
        div.querySelector('.name').textContent = name;
        var messageElement = div.querySelector('.message');
        messageElement.textContent = text;
       // console.log(text)
      }

      saveMessage = (messageText) => {
        // Add a new message entry to the Firebase Database.
         Firebase.database().ref('/messages/').push({
          name: this.getUserName(),
          text: messageText,
          //profilePicUrl: this.getProfilePicUrl()
        }).catch(function(error) {
          console.error('Error writing new message to Firebase Database', error);
        });
      };

      messageSubmit = ()=> {
        this.messageInput = document.getElementById('messageInput');
          if(this.messageInput.value){
              this.saveMessage(this.messageInput.value)
          }
      }

      getUserName = () => {
          //remember to give provision for user to set displayName when signing up
          //currently using email address
          return Firebase.auth().currentUser.email
      }
    render(){
        return<div>
             <Navbar title="Categories"/>
             <div  id = "messages" className="container justify-content-center">
                <div className="card">
                <div className="card-body">
                <div  className="col-md-3"></div>
                <div className="col-md-9">
                    <div>
                        <p class="name"></p>
                        <p class="message"></p>
                    </div>
                    <div>
                        <input type="text" id="messageInput"/><button onClick={this.messageSubmit}>SEND</button>
                    </div>
                </div>
                </div>
                </div>
                </div>
        </div>
    }
}

export default Messages;