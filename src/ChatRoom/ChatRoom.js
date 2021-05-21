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
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
const firebase = require("firebase");

 class ChatRoom extends Component {
   
    constructor() {
        super();
        this.ref = firebase.firestore().collection('users');
        this.unsubscribe = null;
        this.state = {
            message: '',
            messages: [],
            email:'',
            url:'',
            users:[],
            usersInfo:[]
        
        }
    }
    onCollectionUpdate = (querySnapshot) => {
      const usersInfo = [];
      querySnapshot.forEach((doc) => {
        const { email,isOnline,pic,about} = doc.data();
        console.log("Data",doc.id);
        usersInfo.push({
          key: doc.id,
          doc, // DocumentSnapshot
          email,
          isOnline,
          pic,
          about
        });
      });
      this.setState({
        usersInfo
     });
    }
    
    componentDidMount() {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
        };
        const newUser ={
          email:this.state.email,
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
                   {this.state.usersInfo.map((user) => (
                  user.email==messages[key].email?
                  <Avatar 
                  style={{textTransform:'uppercase',background:'#4caf50'}}
                  alt="Remy Sharp" 
                  src={
                    user.pic!=""? user.pic:null
                  }
                  >
                    {messages[key].email ? messages[key].email[0].split('')[0]:''}
                </Avatar>:''
                ))}
              {/* <Avatar 
                style={{textTransform:'uppercase',background:'#c1c1c1c2'}}
                alt="Remy Sharp" 
                >
                  {messages[key].email ? messages[key].email[0].split('')[0]:''}
                </Avatar> */}
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
          {this.state.usersInfo.map((user) => (
            user.email==users[key].email?
            <Avatar 
            style={{textTransform:'uppercase',background:'#4caf50'}}
            alt="Remy Sharp" 
            src={
              user.pic!=""? user.pic:null
            }
            >
              {users[key].email ? users[key].email[0].split('')[0]:''}
          </Avatar>:''
          ))}
              {/* <Avatar 
              style={{textTransform:'uppercase',background:'#4caf50'}}
              //src={users[key].pic}
              >
                {users[key].email ? messages[key].email[0].split('')[0]:''}</Avatar> */}
          </ListItemIcon>
          <ListItemText primary={users[key].email}> </ListItemText>
          </ListItem>
         )
      });
    return (
      <>
      {/* <div className={classes.chatHeader}></div> */}
      <Grid container component={Paper}>
            <Grid item xs={12}>
              <div className={classes.chatHeader}>
                <Toolbar style={{marginTop:15}}>
                  <a href='/dashboard' className={classes.back}>
                  <IconButton edge="start" color="inherit" onClick={this.back} aria-label="close">
                      <ArrowBackIcon/>
                  </IconButton>
                  </a>
                  <Typography variant="h6" className={classes.title}>
                   Chat Room
                  </Typography>
              </Toolbar>
              </div>
            </Grid>
      </Grid>   
      <div style={{overflowX:'hidden',backgroundColor:"#e3eae5"}}>   
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={2} className={classes.borderRight500} style={{paddingTop:100}}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        {this.state.usersInfo.map((user) => (
                        user.email==this.state.email?
                        <Avatar 
                        style={{textTransform:'uppercase',background:'#4caf50'}}
                        alt="Remy Sharp" 
                        src={
                          user.pic!=""? user.pic:''
                        }
                        >
                          {this.state.email ? this.state.email[0].split('')[0]:''}
                        </Avatar>:''
                        ))}
                        </ListItemIcon>
                        <ListItemText primary={this.state.email}></ListItemText>
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
            <Grid item xs={10} style={{backgroundColor:"#e3eae5",paddingTop:85}} className={classes.chat} >
            <Grid item xs={12} >
            <main  className={classes.content} style={{background:"url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDv1P9jgY0zf10uP9wenxHm481IE8RAlsVQMHdY42j2A&usqp=CAU&ec=45673586)"}} >
                <List id='chatview-container' className={classes.messageArea}>
                    {messagesList}
                </List>
             </main>   
            </Grid>
            <Grid item xs={12} >
            <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
                <Grid container style={{backgroundColor:"#e3eae5",padding:10}}>
                <Grid item xs={11}>
                        <TextField id="outlined-basic-email" 
                        label="Type Something" 
                        fullWidth
                        value={this.state.message}
                        onChange={this.updateMessage.bind(this)}
                        />
                  </Grid>
                    <Grid xs={1} align="center">
                        {/* <Fab aria-label="add"><SendIcon style={{color: '#075E54'}} onClick={this.handleSubmit.bind(this)}></SendIcon></Fab> */}
                        <SendIcon style={{color: '#075E54',marginTop:20}} onClick={this.handleSubmit.bind(this)}></SendIcon>
                    </Grid>
                </Grid>
                </form>
            </Grid>
            </Grid>
        </Grid>
      </div>
      </>
    )
  }
}

export default  withStyles(styles)(ChatRoom);