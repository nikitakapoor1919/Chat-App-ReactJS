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

class ChatListComponent extends React.Component {
constructor(props) {
  super(props)

  this.state = {
    query: "",
    data: [],
    filteredData: [],
    status:false
  }
}

  render() {

    const { classes } = this.props;

    if(this.props.chats.length > 0) {
      return(
        <div className={this.state.status ? classes.rootT: classes.root} >
          <div className={classes.header} >
            <span  onClick={()=>this.setState({status:!this.state.status})}> 
            <img src='https://i.postimg.cc/3wJNBP7z/logo.png' alt='..'></img>
            </span>
           <Menu />
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
                        <ListItemAvatar className={this.state.status ? classes.shift:''}>
                          <Avatar className={classes.green} alt="Remy Sharp" style={{textTransform:'uppercase'}}
                         src={
                         _chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]===_chat.user1[0].email[0].split('')[0] ?
                         _chat.user1[0].pic:_chat.user2[0].pic
                         }
                          >
                            {_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                        className={this.state.status ? classes.shift:''}
                          primary={
                            <span className={classes.mail}>
                                  { _chat.users.filter(_user => _user !== this.props.userEmail)[0] }
                            </span>
                            }
                          className={classes.name}
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                  <span  className={classes.text}>
                                  {_chat.messages[_chat.messages.length - 1].image ? "image":null}
                                   {_chat.messages[_chat.messages.length - 1].sticker ?  "image":null}
                                  {_chat.messages[_chat.messages.length - 1].message ? _chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...': null}
                                  </span>
                                  <span className={classes.time}>
                                    {
                                     moment().diff(moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)),'days')  >=1
                                     ?moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)).format('ll')
                                     :moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)).format('h:mm A')
                                    }
                                  </span>  
                              </Typography>
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
                <ListItemIcon>
                  <div>
                  <div className={classes.circle}>
                  <MessageOutlinedIcon className={classes.add}></MessageOutlinedIcon>
                  </div>
                  </div>
              </ListItemIcon> 
            </Button>
            </List>
        </div>
      );
    } else {
      return(
        <div className={classes.root}>
           <div className={classes.header}> 
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







