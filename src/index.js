import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './Login/login';
import SignupComponent from './SignUp/signup';
import DashboardComponent from './Dashboard/dashboard';
import ProfileComponent from './Profile/profile';
// import NotFoundPage from './NotFound/NotFound';
import 'firebase/storage'

const firebase=require("firebase")
require("firebase/firestore")

firebase.initializeApp({
  

})
const storage=firebase.storage()

const routing =(
  <Router>
    <div id="routing-container">
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
      <Route path='/profile' component={ProfileComponent}></Route>
      {/* <Route component={NotFoundPage} /> */}
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
