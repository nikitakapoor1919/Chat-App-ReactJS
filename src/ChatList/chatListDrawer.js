import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import Menu from './Menu'
var moment = require('moment-timezone');

const firebase = require("firebase");

class ChatListComponent extends React.Component {
constructor(props) {
  super(props)
  this.ref = firebase.firestore().collection('users');
   this.unsubscribe = null;
  this.state = {
    query: "",
    data: [],
    filteredData: [],
    status:false,
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

componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
}
  render() {

    const { classes } = this.props;

    if(this.props.chats.length > 0) {
      return(
        <div className={this.state.status ? classes.rootT: classes.rootDrawer} >
          <div className={classes.header} >
            <span  onClick={()=>this.setState({status:!this.state.status})}> 
            <img src='https://raw.githubusercontent.com/nikitakapoor1919/Images/main/apple-touch-icon.png' alt='Logo' className={classes.img}></img>
            </span>
            {console.log("Email"+this.props.userEmail)}
           <Menu email={this.props.userEmail} />
          </div>
            <List>
              {
                this.props.chats.map((_chat, _index) => {
                  return (
                    <div key={_index} >
                      <ListItem onClick={() => this.selectChat(_index)} 
                        className={classes.listItem} 
                        selected={this.props.selectedChatIndex === _index} 
                        alignItems="flex-start">
                        {this.state.users.map((user) => (
                          user.email== _chat.users.filter(_user => _user !== this.props.userEmail)?
                          <ListItemAvatar className={this.state.status ? classes.shift:''}>
                          <Avatar className={classes.green} alt="Remy Sharp" style={{textTransform:'uppercase'}}
                        src={
                        user.pic!="" ? user.pic: user.email.split('')[0]
                        }
                          >
                            {_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}
                          </Avatar>
                      </ListItemAvatar>:''
                        ))}
                        <ListItemText 
                        className={this.state.status ? classes.shift:''}
                          primary={
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                  <div  className={classes.mail}><strong>{ _chat.users.filter(_user => _user !== this.props.userEmail)[0].split('@')[0]  }</strong></div>
                                  {/* <div className={_chat.user2[0].isOnline ? classes.onlineDot: classes.dot}></div> */}
                            </div>
                            }
                          className={classes.name}
                          secondary={
                            <React.Fragment>
                              <div component='span'
                                color='textPrimary' style={{display:"flex",justifyContent:"space-between"}}>
                                  <div  className={classes.text}>
                                  {_chat.messages[_chat.messages.length - 1].image ? "image":null}
                                   {_chat.messages[_chat.messages.length - 1].sticker ?  "image":null}
                                  {_chat.messages[_chat.messages.length - 1].message ? _chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...': null}
                                  </div>
                                  <div className={classes.time}>
                                    {
                                     moment().diff(moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)),'days')  >=1
                                     ?moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)).format('ll')
                                     :moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)).format('h:mm A')
                                    }
                                  </div>  
                              </div>
                            </React.Fragment>
                          }/>
                          {
                            _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
                            <ListItemIcon>
                              <NotificationImportant className={classes.unreadMessage}>
                              </NotificationImportant>
                            </ListItemIcon> :
                            null
                          }
                      </ListItem>
                      <Divider/>
                    </div>
                  )
                })
              }
              <Button 
                onClick={this.newChat} 
                className={classes.newChatBtn}>
                  <div className={classes.circle}>
                  <MessageOutlinedIcon className={classes.add} onClick={this.newChat} ></MessageOutlinedIcon>
                  </div> 
            </Button>
            </List>
        </div>
      );
    } else {
      return(
        <div className={classes.root}>
           <div className={classes.header}> 
           <span  onClick={()=>this.setState({status:!this.state.status})}> 
            <img src='https://raw.githubusercontent.com/nikitakapoor1919/Images/main/apple-touch-icon.png' alt='Logo' className={classes.img}></img>
            </span>
           <Menu />
          </div>
          <Button 
                onClick={this.newChat} 
                className={classes.newChatBtn}>
                <ListItemIcon>
                  <div>
                  <div className={classes.circle}>
                  <MessageOutlinedIcon className={classes.add}></MessageOutlinedIcon>
                  </div>
                  </div>
              </ListItemIcon> 
            </Button>
          <List></List>
        </div>
      );
    }
  }
  
  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);







// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// import styles from './styles';
// import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import NotificationImportant from '@material-ui/icons/NotificationImportant';

// class ChatListComponent extends React.Component {

//   render() {

//     const { classes } = this.props;

//     if(this.props.chats.length > 0) {
//       return(
//         <div className={classes.root}>
//             <Button variant="contained" 
//               fullWidth 
//               color='primary' 
//               onClick={this.newChat} 
//               className={classes.newChatBtn}>
//                 New Message
//             </Button>
//             <List>
//               {
//                 this.props.chats.map((_chat, _index) => {
//                   return (
//                     <div key={_index}>
//                       <ListItem onClick={() => this.selectChat(_index)} 
//                         className={classes.listItem} 
//                         selected={this.props.selectedChatIndex === _index} 
//                         alignItems="flex-start">
//                         <ListItemAvatar>
//                           <Avatar alt="Remy Sharp">{_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
//                         </ListItemAvatar>
//                         <ListItemText 
//                           primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
//                           secondary={
//                             <React.Fragment>
//                               <Typography component='span'
//                                 color='textPrimary'>
//                                   {_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}
//                               </Typography>
//                             </React.Fragment>
//                           }/>
//                           {
//                             _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
//                             <ListItemIcon><NotificationImportant className={classes.unreadMessage}></NotificationImportant></ListItemIcon> :
//                             null
//                           }
//                       </ListItem>
//                       <Divider/>
//                     </div>
//                   )
//                 })
//               }
//             </List>
//         </div>
//       );
//     } else {
//       return(
//         <div className={classes.root}>
//           <Button variant="contained" 
//             fullWidth 
//             color='primary' 
//             onClick={this.newChat} 
//             className={classes.newChatBtn}>
//               New Message
//           </Button>
//           <List></List>
//         </div>
//       );
//     }
//   }
//   userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
//   newChat = () => this.props.newChatBtnFn();
//   selectChat = (index) => this.props.selectChatFn(index);
// }

// export default withStyles(styles)(ChatListComponent)