import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'
import 'rsuite/dist/styles/rsuite-default.css'; 
import { firebaseConfig } from './Firebase/firebaseConfig'

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

