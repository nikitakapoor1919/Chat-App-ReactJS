import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class ChatViewComponent extends React.Component {

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
          <Avatar alt="Remy Sharp" style={{position: 'absolute',left: '20px',top:'3px',textTransform:'uppercase'}}>
            {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0].split('')[0]}
          </Avatar>
        </ListItemAvatar>
            Your conversation with {this.props.chat.users.filter(_usr => _usr !== this.props.user)[0]}
            
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
}

export default withStyles(styles)(ChatViewComponent);