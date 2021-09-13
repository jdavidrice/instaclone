import React from 'react';
import ReactDOM from 'react-dom';
import LogRocket from 'logrocket';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';

LogRocket.init('l6icgt/instaclone');

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
