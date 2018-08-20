// Overlay component to where people chat
import React from 'react';
import Navbar from '../components/Navbar';
import Firebase from '../config/firebase';
import Button from '@material-ui/core/Button';

let selectedPersonUserUID = '';
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
  constructor(props) {
    super(props);
    this.state = {
      //  messageKey: this.props.location.state.messageKey
    }
    this.loadMessages = this.loadMessages.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {

    //this.loadMessages();
    this.LoadChatHistory();
    //console.log(this.props.location.state.messageKey);
    document.addEventListener('click', this.handleMouseClick)
  }

  componentWillMount() {

    this.LoadChatHistory()
    document.removeEventListener('click', this.handleMouseClick)
    this.props.location.state
      ? (selectedPersonUserUID = this.props.location.state.messageKey)
      : null;

    //console.log(this.props.location.state.messageKey);
  }

  handleMouseClick(event) {
    if (event.button === 0) {
      // this.handleEnter()
    }
  }
  handleEnter() {
    alert("hello");
  }

  loadMessages = () => {
    console.log("loads", selectedPersonUserUID)
    const setMessage = function (snap) {
      const data = snap.val();
      console.log(snap.key)
      this.displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
    }.bind(this);
    Firebase.database()
      .ref(`Messages/${selectedPersonUserUID}`)
      .limitToLast(12)
      .on('child_added', setMessage);

  };
  displayMessage = (key, name, text, picUrl, imageUrl) => {
    console.log('pic', picUrl)
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


  LoadChatHistory = () => {
    const setChatHistory = function (snap) {
      const data = snap.val();
      let elements = Object.values(data);
      console.log("loadchathistory", elements)
      let properties = [];
      for (const index in data) {
        properties.push(data[index])
      }
      // console.log(elements['0'])
      this.displayChatHistory(elements['1'], elements['3'], elements['0'])
    }.bind(this);
    Firebase.database()
      .ref(`Users/${userUID}/Messages`)
      .limitToLast(1)
      .on('child_added', setChatHistory);
  }

  displayChatHistory = (name, text, messageKey) => {
    const MESSAGE_TEMPLATE =
      '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
      '</div>';

    let div = document.getElementById(name);
    const messageList = document.getElementById('chatHistory');
    // If an element for that message does not exists yet we create it.
    if (!div) {
      const container = document.createElement('div');
      container.innerHTML = MESSAGE_TEMPLATE;
      div = container.firstChild;
      div.setAttribute('id', name);
      (messageList != null) ? messageList.appendChild(div) : null;
    }
    div.querySelector('.name').textContent = name;
    div.querySelector('.message').textContent = text;
    div.onclick = (event) => {
      if (event.button === 0) {
        selectedPersonUserUID = messageKey
      }
      this.loadMessages()
    }


    // div.querySelector('.pic').style.backgroundImage = `url(${picUrl})`;

    // if (text) { // If the message is text.
    //     messageElement.textContent = text;
    //     // Replace all line breaks by <br>.
    //     messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    //   }

    // if (!picUrl) {
    //   div.querySelector('.pic').style.backgroundImage =
    //     'url(https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png)';
    // }

    // var div = document.getElementById("messages");

    // console.log(text)
    // messageList.scrollTop = messageList.scrollHeight;
  };


  saveMessage = (messageText) => {
    // Add a new message entry to the Firebase Database.
    Firebase.database()
      .ref(`/Messages/${selectedPersonUserUID}`)
      // .ref(`/messages/${userUID}${seletcedPersonUserID}`)
      .push({
        name: this.getUserName(),
        text: messageText,
        profilePicUrl: this.getProfilePicUrl(),
        userUID: userUID
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
    'https://storage.googleapis.com/lsk-guide-jobs.appspot.com/profile_placeholder.png';
  render() {
    return (
      <div>
        <Navbar title="Categories" />
        <div className="container row mt-3">
          <div className="col-md-4">
            <div className='card'>
              <div id='chatHistory' className='chatHistory'>
              </div>
            </div>
          </div>
          <div className="card justify-content-center col-md-8">
            <div className="card-body justify-content-center">
              <div className="">
                <div id="messages" className="message-form" />
                <div className="messageInputContainer">
                  <input className="messageInput" type="text" id="messageInput" />
                  <Button variant='outlined' style={{ backgroundColor: '#FFF', color: '#000' }}
                    onClick={this.messageSubmit}>SEND</Button>
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
