// firebase configuration
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDWHKJFtKRsA_YpQMjfnyL4dbUdttkn9Xo',
  authDomain: 'lsk-guide-jobs.firebaseapp.com',
  databaseURL: 'https://lsk-guide-jobs.firebaseio.com',
  projectId: 'lsk-guide-jobs',
  storageBucket: '',
  messagingSenderId: '319224351068',
};
firebase.initializeApp(config);
const Firebase = firebase;

export default Firebase;
