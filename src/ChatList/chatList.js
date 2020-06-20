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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
var moment = require('moment-timezone');

class ChatListComponent extends React.Component {
constructor(props) {
  super(props)

  this.state = {
    query: "",
    data: [],
    filteredData: []
  }
}

  render() {

    const { classes } = this.props;

    if(this.props.chats.length > 0) {
      return(
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={this.handleOnInputChange}
            />
            
           <Menu />
          </div>
            <List>
              {
                this.props.chats.map((_chat, _index) => {
                  return (
                    <div key={_index}>
                      <ListItem onClick={() => this.selectChat(_index)} 
                        className={classes.listItem} 
                        selected={this.props.selectedChatIndex === _index} 
                        alignItems="flex-start">
                        <ListItemAvatar>
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
                          primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                   {_chat.messages[_chat.messages.length - 1].image ? "image":null}
                                   {_chat.messages[_chat.messages.length - 1].sticker ?  "image":null}
                                  {_chat.messages[_chat.messages.length - 1].message ? _chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...': null}
                                  <span style={{float:"right",fontSize:'13px'}}>
                                    {
                                     moment().diff(moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)),'days')  >=1
                                     ?moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)).format('ll')
                                     :moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)).format('h:mm A')
                                    }
                                    {/* {console.log(moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)).format('h:mm A'))}
                                    {console.log( moment().diff(moment(Number(_chat.messages[_chat.messages.length - 1].timestamp)),'days')  )} */}
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
       
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={this.handleOnInputChange}
            />
            
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
  // handleOnInputChange = event => {
  //   const query = event.target.value;
  //   this.props.chats.map((_chat, _index) => {
  //     return (
  //       <div key={_index}>
  //         <ListItem onClick={() => this.selectChat(_index)} 
  //           className={classes.listItem} 
  //           selected={this.props.selectedChatIndex === _index} 
  //           alignItems="flex-start">
  //           <ListItemAvatar>
  //             <Avatar className={classes.green} alt="Remy Sharp" style={{textTransform:'uppercase'}}>
  //              {query=== _chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0] ? console.log('true'):console.log('false')}
  //             </Avatar>
  //           </ListItemAvatar>
  //           <ListItemText 
  //             primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
  //             />
  //             {
  //               _chat.receiverHasRead === false && !this.userIsSender(_chat) ? 
  //               <ListItemIcon>
  //                 <NotificationImportant className={classes.unreadMessage}>
  //                 </NotificationImportant>
  //               </ListItemIcon> :
  //               null
  //             }
  //         </ListItem>
  //         <Divider/>
  //       </div>
  //     )
  //   })
  // };
  // getData = () => {
  //   fetch(`http://localhost:4000/restaurants`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const { query } = this.state;
  //       const filteredData = data.filter(element => {
  //         return element.name.toLowerCase().includes(query.toLowerCase());
  //       });

  //       this.setState({
  //         data,
  //         filteredData
  //       });
  //     });
  // };
  userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);







