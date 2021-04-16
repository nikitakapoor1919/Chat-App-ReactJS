import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Comment from './Comments.js'
import Post from './showPosts.js'
const firebase = require("firebase");
var moment = require('moment-timezone');

 class CardD extends React.Component {
   constructor(props) {
     super(props)
   
     this.state = {
        like:false,
        comment:false,
        Description:'',
        Image:'',
        profilePic:this.props.url,
        email:'',
        timestamp:'',
        posts:[],
        comments:[],
        likesInPost:0,
        open:false,
        selectedUid:-1
     }
   }
   
 handleClickOpen = () => {
   this.setState({open:true})
  };
handleClose = () => {
  this.setState({open:false})
  };
 componentDidMount(){
        firebase
        .firestore().collection('posts').doc('post')
       .get()
        .then(doc => {
            if (!doc.exists) {
            console.log('No such document!');
            } else {
                this.setState({
                    posts:doc.data().posts.reverse(),
                })
            console.log('All Posts:', doc.data());
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
 }
 submitNew(_uid){
  firebase
  .firestore()
  .collection('comments')
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
  .collection('comments')
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
selectPost = async (uid,index) => {
  await 
  this.setState({ selectedUid: uid });
   console.log('--INDEX--',index)
  // firebase
  // .firestore()
  // .collection('comments')
  // .doc(uid)
  // .get()
  // .then(doc => {
  //     if (!doc.exists) {
  //     console.log('No such document!');
  //     } else {
  //         this.setState({
  //            //comments:doc.data()
  //         })
  //     console.log('All Comments:', doc.data());
  //     }
  // })
}
getComments(_uid){
  firebase
  .firestore().collection('comments').doc(_uid)
 .get()
  .then(doc => {
      if (!doc.exists) {
      console.log('No such document!');
      } else {
          this.setState({
              //comments:doc.data().comments
          })
      console.log('All Posts:', doc.data());
      }
  })
  .catch(err => {
      console.log('Error getting document', err);
  });
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

 openChatDialog=()=>{
  this.setState({open:true})
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
          {console.log("URL: "+this.state.profilePic)}
          <Post posts={this.state.posts}  selectPostFn={this.selectPost} url={this.props.url} />
      </div>
    )
  }
  
}

export default withStyles(styles)(CardD)
