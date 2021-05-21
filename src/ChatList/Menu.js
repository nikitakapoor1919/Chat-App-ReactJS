import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const firebase = require("firebase");

const options = [
//  'Video Chat Room'
//  'Add new Post'
];
const ITEM_HEIGHT = 48;

 function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = React.useState(props.email);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const signOut = async () => {
    // console("Email signout"+email)
    if(email){
      await firebase
        .firestore()
        .collection('users')
        .doc(email)
        .update({
            isOnline:false,
          })
          console.log('Done Uploading Info')
    }
    await firebase.auth().signOut();
    console.log("Email "+ email)
    }
  const handleClose = (index) => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{    position: 'absolute',top: '25px', right: '5px' }}
      >
        <MoreVertIcon style={{ position: 'absolute', top: '5px',right: '5px', cursor:'pointer',color:'white'}} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      > 
       {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
             <a href='/post' style={{ width: '100%', textDecoration: 'none',color:'black'}}> {option}</a>
          </MenuItem>
        ))}
          <MenuItem>
             <a href='/chatroom' style={{ width: '100%', textDecoration: 'none',color:'black'}}> Join Chat Room</a>
          </MenuItem>
        <MenuItem>
        <a href='/profile' style={{ width: '100%', textDecoration: 'none',color:'black'}}>Profile</a>
        </MenuItem>
        {/* <MenuItem>
        <a href='/video-call' style={{ width: '100%', textDecoration: 'none',color:'black'}}>Video Call</a>
        </MenuItem> */}
        <MenuItem  onClick={signOut}>
            SignOut
        </MenuItem>
      </Menu>
    </div>
  );
}
export default LongMenu