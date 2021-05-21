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
// import RSA from './RSA/RSA'

const firebase=require("firebase")
require("firebase/firestore")


const storage=firebase.storage()
const routing =(
  <Router>
    <div id="routing-container" style={{height:'100vh',background:"url(https://res.cloudinary.com/practicaldev/image/fetch/s--WAKqnINn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/tw0nawnvo0zpgm5nx4fp.png)"}} >
    <Route exact path='/' component={LoginComponent}></Route>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
      <Route path='/profile' component={ProfileComponent}></Route>
      {/* <Route path='/post' component={Post} ></Route> */}
      <Route path='/chatroom' component={ChatRoomComponent}></Route>
      {/* <Route path='/video-call' component={VideoCallComponent}></Route> */}
      {/* <Route component={NotFoundPage} /> */}
    </div>
  </Router>

)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
 export {
   storage
 }

