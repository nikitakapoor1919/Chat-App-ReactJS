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
const firebase = require("firebase");
var moment = require('moment-timezone');

 class showPosts extends React.Component {
     constructor(props) {
         super(props)
     
         this.state = {
              pic:this.props.url,
              selectedUid:-1,
              Selected:null
         }
     }
     showContent(index, show) {
        this.setState({
          Selected: show ? index : null,
        });
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
    render() {
        const { classes } = this.props;
        return (
            <div>
                { this.props.posts
                    ?
                    this.props.posts.reverse().map((_post,_index) => {
                    return(
                        <Card className={classes.root} style={{marginBottom:50}} key={_index}>
                        <CardHeader
                        avatar={
                            <Avatar 
                            alt="Remy Sharp" 
                            className={classes.avatar}
                            // src={_post.profilePic}
                            // src={this.props.url}  // My Pic
                        >
                            {_post.email[0].split('')[0]}
                        </Avatar>
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
                        {/* <CardActions disableSpacing >
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
                        {this.state.Selected=== _index ?<Comment comment={this.selectedUid}/> :''} */}
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
