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
                          <Avatar className={classes.green} alt="Remy Sharp" style={{textTransform:'uppercase'}}>
                            {_chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                          secondary={
                            <React.Fragment>
                              <Typography component='span'
                                color='textPrimary'>
                                  {_chat.messages[_chat.messages.length - 1].message.substring(0, 30) + ' ...'}
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

  //   this.setState(prevState => {
  //     const filteredData = prevState.data.filter(element => {
  //       return element.name.toLowerCase().includes(query.toLowerCase());
  //     });

  //     return {
  //       query,
  //       filteredData
  //     };
  //   });
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







