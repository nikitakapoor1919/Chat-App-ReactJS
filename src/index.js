import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './Login/login';
import SignupComponent from './SignUp/signup';
import DashboardComponent from './Dashboard/dashboard';
import ProfileComponent from './Profile/profile';
import Post from './AddPost/post'
import ChatRoomComponent from './ChatRoom/ChatRoom';
// import NotFoundPage from './NotFound/NotFound';
import 'firebase/storage'
import VideoCallComponent from './VideoCall/VideoCall'
import { ContextProvider } from './Context';
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
  //,background:'url(https://i.pinimg.com/originals/45/ce/c7/45cec757faf8d07318cc829dcf21c697.jpg)'
  <Router>
    <div id="routing-container" style={{height:'100vh',backgroundColor:"#e3eae5"}} >
    <Route exact path='/' component={LoginComponent}></Route>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
      <Route path='/profile' component={ProfileComponent}></Route>
      <Route path='/post' component={Post} ></Route>
      <Route path='/chatroom' component={ChatRoomComponent}></Route>
      <Route path='/video-call' component={VideoCallComponent}></Route>
      {/* <Route component={NotFoundPage} /> */}
    </div>
  </Router>

)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
 export {
   storage
 }


// import React from 'react';
// import ReactDOM from 'react-dom';

// import VideoCallComponent from './VideoCall/VideoCall'
// import { ContextProvider } from './Context';

// ReactDOM.render(
//   <ContextProvider>
//     <VideoCallComponent/>
//   </ContextProvider>,
//   document.getElementById('root'),
// );