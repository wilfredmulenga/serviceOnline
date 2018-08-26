//firebase configuration
import firebase from 'firebase';


var config = {
  apiKey: "AIzaSyDWHKJFtKRsA_YpQMjfnyL4dbUdttkn9Xo",
  authDomain: "lsk-guide-jobs.firebaseapp.com",
  databaseURL: "https://lsk-guide-jobs.firebaseio.com",
  projectId: "lsk-guide-jobs",
  storageBucket: "gs://lsk-guide-jobs.appspot.com",
  messagingSenderId: "319224351068"
};
firebase.initializeApp(config);
var Firebase = firebase;

export default Firebase;