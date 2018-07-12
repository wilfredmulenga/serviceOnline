// Overlay component to where people chat
import React from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';

let selecedPersonUserID = '';
let userUID;
const customStyles = {
  content: {
    width: '200px',
    height: '100px',
    color: 'grey',
    absolute: {
      position: 'absolute',
    },
  },
};

Firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userUID = user.uid;
    console.log('signed in');
  } else {
    console.log('signed out');
  }
});

class Messages extends React.Component {
  constructor() {
    super();
    this.LoadMessages = this.LoadMessages.bind(this);
    this.displayMessage = this.displayMessage.bind(this);

    this.messageSubmit = this.messageSubmit.bind(this);
  }

  componentWillMount() {
    // this.LoadMessages()
    this.props.location.state
      ? (selecedPersonUserID = this.props.location.state.selecedPersonUserID)
      : null;

    console.log('componentWIllMount');
  }
  componentDidMount() {
    this.LoadMessages();
    console.log('component did mount');
  }
  LoadMessages = () => {
    const setMessage = function (snap) {
      const data = snap.val();
      this.displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
    }.bind(this);
    Firebase.database()
      .ref(`messages/${userUID}`)
      .limitToLast(12)
      .on('child_added', setMessage);
    Firebase.database()
      .ref(`messages/${userUID}`)
      .limitToLast(12)
      .on('child_added', setMessage);
  };

  displayMessage = (key, name, text, picUrl, imageUrl) => {
    const MESSAGE_TEMPLATE =
      '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
      '</div>';

    let div = document.getElementById(key);
    const messageList = document.getElementById('messages');
    // If an element for that message does not exists yet we create it.
    if (!div) {
      const container = document.createElement('div');
      container.innerHTML = MESSAGE_TEMPLATE;
      div = container.firstChild;

      div.setAttribute('id', key);

      messageList.appendChild(div);
    }
    div.querySelector('.name').textContent = name;
    div.querySelector('.message').textContent = text;
    div.querySelector('.pic').style.backgroundImage = `url(${picUrl})`;

    // if (text) { // If the message is text.
    //     messageElement.textContent = text;
    //     // Replace all line breaks by <br>.
    //     messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    //   }

    if (!picUrl) {
      div.querySelector('.pic').style.backgroundImage =
        'url(https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png)';
    }

    // var div = document.getElementById("messages");

    // console.log(text)
    messageList.scrollTop = messageList.scrollHeight;
  };

  saveMessage = (messageText) => {
    // Add a new message entry to the Firebase Database.
    Firebase.database()
      .ref(`/messages/${userUID}${selecedPersonUserID}`)
      .push({
        name: this.getUserName(),
        text: messageText,
        profilePicUrl: this.getProfilePicUrl(),
      })
      .catch((error) => {
        console.error('Error writing new message to Firebase Database', error);
      });
  };

  messageSubmit = () => {
    this.messageInput = document.getElementById('messageInput');
    if (this.messageInput.value) {
      this.saveMessage(this.messageInput.value);
      this.messageInput.value = '';
    }
  };

  getUserName = () =>
    // remember to give provision for user to set displayName when signing up
    // currently using email address
    Firebase.auth().currentUser.email;

  getProfilePicUrl = () =>
    Firebase.auth().currentUser.photoURL ||
    'https://storage.googleapis.com/lsk-guide-jobs.appspot.com/pexels-photo-428361.jpeg';
  render() {
    return (
      <div>
        <Navbar title="Categories" />
        <div className="container justify-content-center col-md-6">
          <div className="card">
            <div className="card-body justify-content-center">
              <div className="">
                <div id="messages" className="message-form" />
                <div className="messageInputContainer">
                  <input className="messageInput" type="text" id="messageInput" />
                  <button onClick={this.messageSubmit}>SEND</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
