import React, { Component } from 'react';
import Moment from "moment/moment";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const firebase = require("firebase");

 class ChatRoom extends Component {
   
    constructor() {
        super();
        this.state = {
            message: '',
            messages: [],
            email:'',
            url:'',
            users:[]

        }
    }
      
    componentDidMount() {
      const self = this;
      firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
         this.props.history.push('/login');
       else {
            {this.setState({email:_usr.email})}
         await firebase
          .firestore().collection('users').doc(_usr.email)
         .get()
          .then(doc => {
              if (!doc.exists) {
              console.log('No such document!');
              } else {
                  this.setState({
                      email:doc.data().email,
                      url:doc.data().pic
                  })
              console.log('Document data:', doc.data());
              }
          })
          .catch(err => {
              console.log('Error getting document', err);
          });
          await
        firebase.firestore().collection("groupchat").doc("messages").onSnapshot(function(querySnapshot) {
            let messageList = [];
            if(querySnapshot.data() && querySnapshot.data().messages){
                messageList = querySnapshot.data().messages;
            }
            self.setState({
                messages: messageList
            });
        });
        await
        firebase.firestore().collection("groupchat").doc("users").onSnapshot(function(querySnapshot) {
            let userList = [];
            if(querySnapshot.data() && querySnapshot.data().users){
               userList = querySnapshot.data().users;
            }
            self.setState({
                users:  userList
            });
        });
        }
    });
    const container = document.getElementById('chatview-container');
      if(container)
        container.scrollTo(0, container.scrollHeight);
    }

    updateMessage(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        const db = firebase.firestore();
        e.preventDefault();
        const newMessage = {
            text: this.state.message,
            createdAt: Date.now(),
            email:this.state.email,
            //pic:this.state.url
        };
        const newUser ={
          email:this.state.email,
          //pic:this.state.url
        }
  
        let messages = this.state.messages;
        messages.push(newMessage);
        
        let users=this.state.users;
        if(!users.some(e => e.email === this.state.email))
        users.push(newUser)

        const docData = {
            messages: messages
        };
        const docUser={
             users:users
        }
        db.collection("groupchat").doc("messages").update(docData).then(function() {
            console.log("Document successfully written!");
        }).catch((err) => {
            console.log("Document update failed! : ", err);
        });

        db.collection("groupchat").doc("users").update(docUser).then(function() {
          console.log("User successfully added!");
        }).catch((err) => {
            console.log("User update failed! : ", err);
        });
       
        this.setState({
            message: '',
        });
    }
    componentDidUpdate = () => {
      const container = document.getElementById('chatview-container');
      if(container)
       { container.scrollTo(0, container.scrollHeight);}
    }
  render() {
        const { messages,users } = this.state;
        const { classes } = this.props;
        console.log("firestore messages : ",messages);
        console.log("firestore users : ",users);
        
        const messagesList = Object.keys(messages).map((key, index) => {
          return (  <div key={key} className={messages[key].email===this.state.email ? classes.userSent : classes.friendSent}>
              <Avatar 
                style={{textTransform:'uppercase',background:'#c1c1c1c2'}}
                alt="Remy Sharp" 
                //src={ messages[key].email===this.state.email ? this.state.url : messages[key].pic}
                >
                  {messages[key].email ? messages[key].email[0].split('')[0]:''}
                </Avatar>
             <div style={{textAlign:"right",fontSize:'13px',marginRight:'10px',position:'relative',top:-30}}>~{messages[key].email.split('@')[0]}</div>   
            <span> {messages[key].text}</span>
            <div style={{textAlign:"right",fontSize:'13px',marginRight:'10px'}}>
            <span >{Moment(messages[key].createdAt).format("hh:mm")}</span>
            <span style={{marginLeft:10}}>{Moment(messages[key].createdAt).format("ll")}</span>
            </div>
          </div>);
        });
        const usersList = Object.keys(users).map((key, index) => { 
         return(
          <ListItem button key={key}>
          <ListItemIcon>
              <Avatar 
              style={{textTransform:'uppercase',background:'#c1c1c1c2'}}
              //src={users[key].pic}
              >
                {messages[key].email ? messages[key].email[0].split('')[0]:''}</Avatar>
          </ListItemIcon>
          <ListItemText className={classes.colorW} primary={users[key].email}> </ListItemText>
          </ListItem>
         )
      });
    return (
      <div style={{overflowX:'hidden'}}>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar 
                          style={{textTransform:'uppercase',background:'#c1c1c1c2'}}
                          alt="Remy Sharp" 
                          // src={
                          //   this.state.url
                          // }
                          >
                            {this.state.email ? this.state.email[0].split('')[0]:''}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText className={classes.colorW }primary={this.state.email}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <Typography  className={classes.heading}>Group Members</Typography>
                </Grid>
                <Divider />
                <List>
                      {usersList}
                </List>
            </Grid>
            <Grid item xs={9} className={classes.chat}>
            <main  className={classes.content} style={{background:"url(data:image/jpeg;base64,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)"}}>
                <List id='chatview-container' className={classes.messageArea}>
                    {messagesList}
                </List>
             </main>   
                <Divider />
                <form className="form-group" onSubmit={this.handleSubmit.bind(this)} >
                <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                        <TextField id="outlined-basic-email" 
                        label="Type Something" 
                        fullWidth
                        value={this.state.message}
                        onChange={this.updateMessage.bind(this)}
                        />
                  </Grid>
                    <Grid xs={1} align="right">
                        <Fab  aria-label="add"><SendIcon   onClick={this.handleSubmit.bind(this)}></SendIcon></Fab>
                    </Grid>
                </Grid>
                </form>
            </Grid>
        </Grid>
      </div>
    )
  }
}

export default  withStyles(styles)(ChatRoom);