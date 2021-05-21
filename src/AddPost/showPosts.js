import React from 'react';
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
import Comment from './Comments.js'
import { Favorite } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';
const firebase = require("firebase");
var moment = require('moment-timezone');
 
 class showPosts extends React.Component {
     constructor(props) {
         super(props)
         this.ref = firebase.firestore().collection('users');
         this.ref2 = firebase.firestore().collection('likes');
         this.ref3 = firebase.firestore().collection('posts');
         this.unsubscribe = null;
         this.unsubscribe2 = null;
         this.unsubscribe3 = null;
         this.state = {
              pic:this.props.url,
              selectedUid:-1,
              Selected:null,
              users:[],
              likes:[],
              likedUid:[],
              likesStatus:false,
              commmentPost:'',
         }
     }
     onCollectionUpdate = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const { email,isOnline,pic,about} = doc.data();
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
      onCollectionUpdate2 = (querySnapshot) => {
        const likes = [];
        querySnapshot.forEach((doc) => {
          const { like,uid,user} = doc.data();
          // console.log("Data Likes",doc.data());
          likes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            like,
            uid,
            user,
          });
        });
        this.setState({
          likes
       });
      }
      onCollectionUpdate3 = (querySnapshot) => {
        const likedUid = [];
        querySnapshot.forEach((doc) => {
          const { likePic} = doc.data();
          likedUid.push({
            key: doc.id,
            doc, // DocumentSnapshot
            likePic
          });
        });
        this.setState({
          likedUid
       })
      }
      
     showContent(index, show) {
        this.setState({
          Selected: show ? index : null,
        });
      } 
      firebaseUpdate(likes,uid1,index) {
        // const obj = { email:this.props.email } 
        // const obj2 = {uid:uid1} 
        // this.state.likes.map((data) => (
        //   data.uid == uid1? 
        //   data.user.map((d) => (
        //         d.email == this.props.email ? 
        //         firebase
        //         .firestore()
        //         .collection('likes')
        //         .doc(uid1)
        //         .update({
        //             like:firebase.firestore.FieldValue.increment(-1),
        //             user: firebase.firestore.FieldValue.arrayRemove(obj)
        //         })
          
        //       :
        //      null
        //     ))
        //     :
        //    null
        //   ))
        //   this.state.likes.map((data) => (
        //     data.uid == uid1? 
        //     data.user.map((d) => (
        //       d.email == this.props.email ?
        //           firebase
        //           .firestore()
        //           .collection('posts')
        //           .doc(this.props.email)
        //           .update({
        //             likePic: firebase.firestore.FieldValue.arrayRemove(obj2)
        //           })
        //           .then(function() {
        //            return
        //         }).catch((err) => {
        //             console.log("Document update failed! : ", err);
        //         })
        //         :
        //        null
        //       ))
        //       :
        //      null
        //     ))
        
             firebase
            .firestore()
            .collection('likes')
            .doc(uid1)
            .update({
                like:firebase.firestore.FieldValue.increment(1),
                user: firebase.firestore.FieldValue.arrayUnion({
                  email:this.props.email
              }),
            });
            firebase
            .firestore()
            .collection('posts')
            .doc(this.props.email)
            .update({
                likePic: firebase.firestore.FieldValue.arrayUnion({
                  uid:uid1
              }),
            });
        
        // firebase.firestore().collection("posts").doc(this.props.email).listCollections()
        // .then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });
        //     const obj = { email:this.props.email } 
        //     const obj2 = {uid:uid1} 
        //     console.log("Object2"+ obj2.uid)
        //     firebase
        //     .firestore()
        //     .collection('likes')
        //     .doc(uid1)
        //     .update({
        //         like:firebase.firestore.FieldValue.increment(-1),
        //         user: firebase.firestore.FieldValue.arrayRemove(obj)
        //     });
        //     firebase
        //     .firestore()
        //     .collection('posts')
        //     .doc(this.props.email)
        //     .update({
        //        likePic: firebase.firestore.FieldValue.arrayRemove(obj2)
        //     });
        // })
        // .catch((error) => {
        //     firebase
        //     .firestore()
        //     .collection('likes')
        //     .doc(uid1)
        //     .update({
        //         like:firebase.firestore.FieldValue.increment(1),
        //         user: firebase.firestore.FieldValue.arrayUnion({
        //           email:this.props.email
        //       }),
        //     });
        //     firebase
        //     .firestore()
        //     .collection('posts')
        //     .doc(this.props.email)
        //     .update({
        //         likePic: firebase.firestore.FieldValue.arrayUnion({
        //           uid:uid1
        //       }),
        //     });
        // });
      } 
    selectPost = (index) =>{
        console.log(this.props.posts[index].uid)
        this.setState({selectedUid:this.props.posts[index].uid})
        this.comment(this.props.posts[index].uid,index)
    }
    comment=async(u,index)=>{
        console.log('--U--',u)

         this.props.selectPostFn(u,index);
    }
    componentDidUpdate(){
      // if(this.state.commmentPost!=' '){
      //   this.setState({commmentPost:''})
      // }
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.unsubscribe2 = this.ref2.onSnapshot(this.onCollectionUpdate2);
        this.unsubscribe3 = this.ref2.onSnapshot(this.onCollectionUpdate3);
      }
      submitNew(uid){
        firebase
        .firestore()
        .collection('comments')
        .doc(uid)
        .update({
           commentsPost:firebase.firestore.FieldValue.arrayUnion({
             email:this.props.email,
             comment:this.state.commmentPost,
             timestamp:Date.now()
           }),
           totalComment:firebase.firestore.FieldValue.increment(1)
        });
        // this.setState({commmentPost:''})
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
    render() {
        const { classes } = this.props;
        return (
            <div>
                { this.props.posts
                    ?
                    this.props.posts.reverse().map((_post,_index) => {
                    return(
                        <Card className={classes.root} style={{marginBottom:50,marginTop:20}} key={_index}>
                        <CardHeader
                        avatar={
                            this.state.users.map((user,_index) => (
                                user.email == _post.email? 
                                <Avatar
                                   key={_index} 
                                  alt={_post.email}
                                  className={classes.avatar}
                                  src={
                                    user.pic!="" ? user.pic: user.email.split('')[0]
                                    }
                       
                                 >
                                   {_post.email[0].split('')[0]}
                                 </Avatar>
                                  :
                                  ''
                                ))
                        }
                        title={_post.email}
                        subheader={moment(_post.timestamp).format('ll h:mm A')} 
                        />
                    {_post.Image ?
                        <CardMedia
                        className={classes.media}
                        image={_post.Image}
                        title={_post.email}
                        style={{backgroundSize: 'contain'}}
                    />:null}
                        <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{color:'black'}}>
                        {_post.Description}
                        </Typography>
                        </CardContent>
                        <Divider/>
                        <CardActions disableSpacing >
                        <IconButton onClick={() =>this.firebaseUpdate(_post.likes,_post.uid,_index)}>
                        {/* {
                          this.state.likes.map((data) => (
                            data.uid == _post.uid? 
                            data.user.map((d) => (
                              d.email == this.props.email? 
                              <Favorite style={{color:"red"}}/>
                                :
                               ''
                              ))
                              :
                             ''
                            ))
                        } */}
                        {/* {
                          this.state.likedUid.map((data) => (
                            data.likePic.map((d) => (
                             d.uid==_
                              ))
                            ))
                        } */}
                          <Favorite style={this.state.likeStatus ? {color:"red"} :{color:"gray"}}/>
                        </IconButton>
                        {
                          this.state.likes.map((data) => (
                            data.uid == _post.uid? 
                            data.like
                              :
                             ''
                            ))
                        }
                        {this.state.Selected === _index ? (
                        <IconButton onClick={() =>this.showContent(_index, false)}>
                        <ChatIcon />
                        </IconButton>):(  <IconButton onClick={() =>this.showContent(_index, true)}>
                            <ChatIcon />
                        </IconButton>)}
                        <span style={{marginLeft:-5}}>
                        {_post.commments ? _post.commments:0}
                        </span>
                        </CardActions>
                        <Comment uid={_post.uid} email={this.props.email}/>
                        {/* <Card >
                        <CardContent>
                        <div style={{display:"flex",justifyContent:"space-between"}} >
                        <form >
                            <TextField
                            // autoFocus
                            margin="dense"
                            id="name"
                            label="Write Comment..."
                            style={{width:'100%'}}
                            onChange={(e)=>this.userTyping('write',e)}
                            multiline
                            variant="outlined" 
                            />
                            <Button  onClick={this.submitNew(_post.uid)} color="primary" style={{marginTop:15,marginLeft:10}}>
                            ADD
                            </Button>
                        </form>
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
                        </Card> */}
                        </Card>
                    )
                    })
                    : null
                    }
            </div>
        )
    }
}

export default withStyles(styles)(showPosts)
