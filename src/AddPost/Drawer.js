import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';
import { ExitToApp, MessageOutlined, PersonOutline} from '@material-ui/icons';
const firebase = require("firebase");

const useStyles = makeStyles({
  root:{
    backgroundColor:"rgb(227, 234, 229)",
    height:"100vh"
  },
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  MenuIcon:{
    display:"block",
    margin: 25,
    fontSize: 30,
    color: "white"
  },
  link:{
    textDecoration:"none",
    color:"black"
  }
});

export default function MyDrawer(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState(props.email);
  const [state, setState] = React.useState({
    right: false,
  });
  const signOut = async () => {
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
    }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button>
            <ListItemIcon><PersonOutline/></ListItemIcon>
            <Link href='/profile' className={classes.link}><ListItemText primary="Profile" /></Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon><MessageOutlined /></ListItemIcon>
            <Link href='/dashboard' className={classes.link}><ListItemText primary="Messenger" /></Link>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button>
            <ListItemIcon><ExitToApp/></ListItemIcon>
            <ListItemText primary="SignOut"   onClick={signOut} />
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon className={classes.MenuIcon}/></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.root}>
            {list(anchor)}
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
