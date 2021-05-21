import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ReactEncrypt from 'react-encrypt'
var moment = require('moment-timezone');


const firebase = require("firebase");

class ChatViewComponent extends React.Component {
 constructor(props) {
   super(props)
   this.ref = firebase.firestore().collection('users');
   this.unsubscribe = null;
   this.state = {
      about:null,
      friendEmail:null,
      pic:'',
      recieverName:null,
      isOnline:false,
      users:[]
   }
 }
 onCollectionUpdate = (querySnapshot) => {
  const users = [];
  querySnapshot.forEach((doc) => {
    const { email,isOnline,pic,about} = doc.data();
    console.log("Data",doc.id);
    users.push({
      key: doc.id,
      doc, // DocumentSnapshot
      email,
      isOnline,
      pic,
      about
    });
  });
  this.setState({
    users
 });
}

 scrollToBottom=()=>{
  const container = document.getElementById('chatview-container');
  if(container)
    container.scrollTo(0, container.scrollHeight);
 }
componentDidMount = () => {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  const container = document.getElementById('chatview-container');
  if(container)
    container.scrollTo(0, container.scrollHeight);
    
}
componentDidUpdate = () => {
  const container = document.getElementById('chatview-container');
  if(container)
    {container.scrollTo(0, container.scrollHeight);}
}

reciever=()=>{
  this.setState({recieverName:this.props.chat.users.filter(_usr => _usr !== this.props.user)})
}
  render() {
    
    const { classes } = this.props;
    const encryptKey="ewfWE@#%$rfdsefgdsf";
    
    if(this.props.chat === undefined) {
      return(<main  className={this.props.style ? classes.content:classes.contentNS}></main>);
    } else if(this.props.chat !== undefined) {
      return(
        <div>
          <div className={classes.chatHeader}>
          
          <ListItemAvatar>
          {this.state.users.map((user) => (
            user.email == this.props.chat.users.filter(_usr => _usr !== this.props.user)? 
            <Avatar 
              alt="Remy Sharp" 
              className={classes.green} 
              style={{position: 'absolute',top:'20px',textTransform:'uppercase'}}
              src={
              user.pic ? user.pic : this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('')[0]
              }
   
             >
               {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('')[0]}
             </Avatar>
              :
             ''
            ))}
        </ListItemAvatar>
        {this.state.users.map((user) => (
            user.email == this.props.chat.users.filter(_usr => _usr !== this.props.user)? 
        <ListItemText 
          className={classes.list}
          primary={this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('@')[0]}
          secondary=
           {<Typography>
            <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>
              {user.about}
            </Typography>
            <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>
                {user.isOnline ? <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>Online</Typography> : <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>Offline</Typography>}
            </Typography>
            </Typography>
          }
          />
          :''
          ))}
          </div>
          <main id='chatview-container' className={classes.content} style={{background:"url(https://res.cloudinary.com/practicaldev/image/fetch/s--WAKqnINn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/tw0nawnvo0zpgm5nx4fp.png)"}}>
            {
              this.props.chat.messages.map((_msg, _index) => {
                return(
                <div >
                  {_msg.image ? 
                    <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent} style={{background:'transparent'}}>
                    <img alt='...' src={_msg.image} className={classes.image}></img>
                    <div style={{textAlign:"right",fontSize:'13px',color:'black'}}>
                      {moment(Number(_msg.timestamp)).format('h:mm A')} 
                     </div>
                  </div> 
                  :
                  _msg.sticker ?
                  <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent} style={{background:'transparent'}}>
                    <img  src={require(`../images/${_msg.sticker}`)} alt="sticker" className={classes.image}></img>
                    <div style={{textAlign:"right",fontSize:'13px',color:'black'}}>
                      {moment(Number(_msg.timestamp)).format('h:mm A')} 
                     </div>
                  </div>
                  : 
                  <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
                    {_msg.message} 
                    <div style={{textAlign:"right",fontSize:'13px'}}>
                     {moment(Number(_msg.timestamp)).format('h:mm A')} 
                    </div>
                  </div>}
                
                </div>
                )
              })
            }
          </main>
        </div>
      );
    } else {
      return (<div className='chatview-container'>Loading...</div>);
    }
  }
  find=(_usr)=>{
    firebase
    .firestore().collection('users').doc(_usr)
   .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
          console.log(doc.data().about)
              this.setState({
                about:doc.data().about,
                pic:doc.data().pic,
                isOnline:doc.data().isOnline
            })
            console.log(' document!',doc.data());
        }
    })
  }
  findPic=(_usr)=>{
    firebase
    .firestore().collection('users').doc(_usr)
   .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
          console.log(doc.data().pic)
          return doc.data().pic

        }
    })
  }
}

export default withStyles(styles)(ChatViewComponent);
