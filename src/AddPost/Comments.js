import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
const firebase = require("firebase");
var moment = require('moment-timezone');

export class Comments extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             open:false,
             commmentPost:'',
             comments:[]
        }
    }
    openChatDialog=()=>{
    this.setState({open:true})
    }
    handleClickOpen = () => {
        this.setState({open:true})
    };
    handleClose = () => {
    this.setState({open:false})

    };

   submitNew(_uid){
    firebase
    .firestore()
    .collection('posts')
    .doc(_uid)
    .set({
       comments:firebase.firestore.FieldValue.arrayUnion({
         email:this.props.email,
         profilePic:this.props.url,
         comment:this.state.commmentPost,
         timestamp:Date.now()
       })
    });
      console.log('Done Uploading Info')
      this.setState({commmentPost:''})
  }
  submit(_uid){
    firebase
    .firestore()
    .collection('posts')
    .doc(_uid)
    .update({
       comments:firebase.firestore.FieldValue.arrayUnion({
         email:this.props.email,
         profilePic:this.props.url,
         comment:this.state.commmentPost,
         timestamp:Date.now()
       })
    });
      console.log('Done Uploading Info')
      this.setState({commmentPost:''})
  
  }
   userTyping=(type,e)=>{
    switch(type){
        case 'write':
          this.setState({commmentPost:e.target.value})
            break
        default:
            break
    }
  } 
  componentDidUpdate(){
        // firebase
        // .firestore()
        // .collection('comments')
        // .doc(this.props.comment)
        // .get()
        // .then(doc => {
        //     if (!doc.exists) {
        //     console.log('No such document!');
        //     } else {
        //         this.setState({
        //             comments:doc.data()
        //         })
        //     console.log('All Comments:', doc.data());
        //     }
        // })
  }
    render() {
        const { classes } = this.props;
        return (
            <div>
            <Card>
                {/* <CardActions>
                    <IconButton style={{marginLeft:30}}>
                        <ChatIcon onClick={this.openChatDialog}/>
                        </IconButton>
                </CardActions> */}
                {/* <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open} > */}
                    <Card >
                    <CardContent>
                    <div style={{width:400}} >
                    <TextField
                    // autoFocus
                    margin="dense"
                    id="name"
                    label="Write Comment..."
                    style={{width:'60%',marginLeft:20}}
                    onChange={(e)=>this.userTyping('write',e)}
                    multiline
                    variant="outlined" 
                    />
                    <Button onClick={this.submitNew.bind(this,this.props.uid)} color="primary" style={{marginTop:15,marginLeft:10}}>
                    ADD
                    </Button>
                    </div>
                    <CardHeader
                    avatar={
                    <Avatar  className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                    />
                    <Typography variant="body2" color="textSecondary" component="p" style={{marginLeft: 70,color:'black'}}>
                    This impressive 
                    </Typography>
                    </CardContent>
                    </Card>
                {/* </Dialog> */}
            </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Comments)
