import React from 'react';
import {  Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
import TextField from '@material-ui/core/TextField';

const firebase = require("firebase");

class NewChatComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      message: null
    };
  }

  render() {

    const { classes } = this.props;

    return(
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">New Message</Typography>
          <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="  Enter Email"
                  name="username"
                  autoFocus
                  onChange={(e) => this.userTyping('username', e)} 
                  id='new-chat-username'
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  autoComplete='off'
                  fullWidth
                  name="message"
                  multiline
                  rows={5}
                  // rowsMax={4}
                  label="Message"
                  onChange={(e) => this.userTyping('message', e)} 
                  id='new-chat-message'
                />
            
            <Button fullWidth variant='contained' style={{background:'#075E54',color:'white'}} className={classes.submit} type='submit'>Send</Button>
          </form>
          {
            this.state.serverError ? 
            <Typography component='h5' variant='h6' className={classes.errorText}>
              Unable to locate the user
            </Typography> :
            null
          }
        </Paper>
      </main>
    );
  }

  componentWillMount() {
    if(!firebase.auth().currentUser)
      this.props.history.push('/login');
  }

  userTyping = (inputType, e) => {
    switch (inputType) {
      case 'username':
        this.setState({ username: e.target.value });
        break;
      
      case 'message':
        this.setState({ message: e.target.value });
        break;

      default:
        break;
    }
  }

  submitNewChat = async (e) => {
    e.preventDefault();
    const userExists = await this.userExists();
    if(userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  }

  buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':');

  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    });
  }

  goToChat = () => this.props.goToChatFn(this.buildDocKey(), this.state.message);

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await 
      firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
    console.log(chat.exists);
    return chat.exists;
  }
  userExists = async () => {
    const usersSnapshot = await 
    firebase
      .firestore()
      .collection('users')
      .get();
    const exists = usersSnapshot
      .docs
        .map(_doc => _doc.data().email)
        .includes(this.state.username);
    this.setState({ serverError: !exists });
    return exists;
  }
}

export default withStyles(styles)(NewChatComponent);