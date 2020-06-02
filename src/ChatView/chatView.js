import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const firebase = require("firebase");

class ChatViewComponent extends React.Component {
 constructor(props) {
   super(props)
 
   this.state = {
      about:null,
      friendEmail:null
   }
 }
 
  componentDidMount = () => {
    const container = document.getElementById('chatview-container');
    if(container)
      container.scrollTo(0, container.scrollHeight);
  }
  componentDidUpdate = () => {
    const container = document.getElementById('chatview-container');
    if(container)
      container.scrollTo(0, container.scrollHeight);
  }

  render() {

    const { classes } = this.props;

    if(this.props.chat === undefined) {
      return(<main  className={classes.content}></main>);
    } else if(this.props.chat !== undefined) {
      return(
        <div>
          <div className={classes.chatHeader}>
          <ListItemAvatar>
          <Avatar alt="Remy Sharp" className={classes.green} style={{position: 'absolute',left: '20px',top:'20px',textTransform:'uppercase'}}>
            {/* <a href='#'  style={{ width: '100%', textDecoration: 'none',color:'white'}} >
            {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('')[0]}
            </a> */}
            <Button onClick={this.find(this.props.chat.users.filter(_usr => _usr !== this.props.user)[0])} style={{color:'white',fontSize:'20px'}}>
            {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('')[0]}
            </Button>
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
          className={classes.list}
          primary={this.props.chat.users.filter(_usr => _usr !== this.props.user)[0]}
          secondary= {<Typography variant="h6" style={{ color: 'white',fontSize:'12px' }}>{this.state.about}</Typography>}
          />
            {/* Your conversation with {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0]} */}
            
          </div>
          <main id='chatview-container' className={classes.content}>
            {
              this.props.chat.messages.map((_msg, _index) => {
                return(
                <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
                  {_msg.message}
                  <div style={{textAlign:"right"}}>
                  {Moment(_msg.timestamp).format("HH:MM a")}
                  </div>
                </div>
                )
              })
            }
          </main>
        </div>
      );
    } else {
      return (<div className='chatview-container'>Loading...</div>);
    }
  }
  find=(_usr)=>{
    firebase
    .firestore().collection('users').doc(_usr)
   .get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
            this.setState({
                about:doc.data().about,
            })
            console.log(' document!',doc.data());
        }
    })
  }
}

export default withStyles(styles)(ChatViewComponent);