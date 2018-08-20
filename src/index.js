/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
// not a good idea but much better
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../src/styles/firebaseui.css'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
