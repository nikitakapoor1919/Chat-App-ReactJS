import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './Login/login';
import SignupComponent from './SignUp/signup';
import DashboardComponent from './Dashboard/dashboard';
import ProfileComponent from './Profile/profile';
import 'firebase/storage'

const firebase=require("firebase")
require("firebase/firestore")

firebase.initializeApp({
    apiKey: "AIzaSyC08poH07nnZtY77bn2Ut03sOCMt3Y7Fpg",
    authDomain: "react-chatapp-22693.firebaseapp.com",
    databaseURL: "https://react-chatapp-22693.firebaseio.com",
    projectId: "react-chatapp-22693",
    storageBucket: "react-chatapp-22693.appspot.com",
    messagingSenderId: "789043871337",
    appId: "1:789043871337:web:5b4a4e5ae9cd3d7d2facf8",
    measurementId: "G-P79Z7SB2GJ"
})
const storage=firebase.storage()

const routing =(
  <Router>
    <div id="routing-container">
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
      <Route path='/profile' component={ProfileComponent}></Route>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 export {
   storage
 }