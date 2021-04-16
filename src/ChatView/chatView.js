import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
var moment = require('moment-timezone');


const firebase = require("firebase");

class ChatViewComponent extends React.Component {
 constructor(props) {
   super(props)
 
   this.state = {
      about:null,
      friendEmail:null,
      pic:'',
      recieverName:null,
      isOnline:false
   }
 }
 scrollToBottom=()=>{
  const container = document.getElementById('chatview-container');
  if(container)
    container.scrollTo(0, container.scrollHeight);
 }
componentDidMount = () => {
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

    if(this.props.chat === undefined) {
      return(<main  className={this.props.style ? classes.content:classes.contentNS}></main>);
    } else if(this.props.chat !== undefined) {
      return(
        <div>
          <div className={classes.chatHeader}>
          
          <ListItemAvatar>
          <Avatar 
           alt="Remy Sharp" 
           className={classes.green} 
           style={{position: 'absolute',left: '20px',top:'20px',textTransform:'uppercase'}}
           src={
            // this.props.chat.users.filter(_usr => _usr !== this.props.user )[0].split('')[0]===this.props.chat.user1[0].email[0].split('')[0] ?
            // this.props.chat.user1[0].pic:this.props.chat.user2[0].pic
            
            this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('')[0]
           }

          >
            {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('')[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
          className={classes.list}
          primary={this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('@')[0]}
          secondary=
           {<Typography>
            <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>
              {/* {this.props.chat.users.filter(_usr => _usr !== this.props.user )[0].split('')[0]===this.props.chat.user1[0].email[0].split('')[0] ?
            this.props.chat.user1[0].about:this.props.chat.user2[0].about } */}
              {/* {this.props.chat.user2[0].isOnline ? <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>Online</Typography> : <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>Offline</Typography>} */}
            </Typography>
            <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>
                {/* {this.props.chat.users.filter(_usr => _usr !== this.props.user )[0].split('')[0]===this.props.chat.user1[0].email[0].split('')[0] ?
            this.props.chat.user1[0].isOnline:this.props.chat.user2[0].isOnline } */}
                {/* {this.props.chat.user2[0].isOnline ? <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>Online</Typography> : <Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>Offline</Typography>} */}
            </Typography>
            </Typography>
          }
          />
          </div>
          <main id='chatview-container' className={classes.content} style={{background:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDv1P9jgY0zf10uP9wenxHm481IE8RAlsVQMHdY42j2A&usqp=CAU&ec=45673586)"}}>
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

// import React from 'react';
// import styles from './styles';
// import { withStyles } from '@material-ui/core/styles';

// class ChatViewComponent extends React.Component {

//   componentDidMount = () => {
//     const container = document.getElementById('chatview-container');
//     if(container)
//       container.scrollTo(0, container.scrollHeight);
//   }
//   componentDidUpdate = () => {
//     const container = document.getElementById('chatview-container');
//     if(container)
//       container.scrollTo(0, container.scrollHeight);
//   }

//   render() {

//     const { classes } = this.props;

//     if(this.props.chat === undefined) {
//       return(<main className={classes.content}></main>);
//     } else if(this.props.chat !== undefined) {
//       return(
//         <div>
//           <div className={classes.chatHeader}>
//             Your conversation with {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0]}
//           </div>
//           <main id='chatview-container' className={classes.content}>
//             {
//               this.props.chat.messages.map((_msg, _index) => {
//                 return(
//                 <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
//                   {_msg.message}
//                 </div>
//                 )
//               })
//             }
//           </main>
//         </div>
//       );
//     } else {
//       return (<div className='chatview-container'>Loading...</div>);
//     }
//   }
// }

// export default withStyles(styles)(ChatViewComponent);