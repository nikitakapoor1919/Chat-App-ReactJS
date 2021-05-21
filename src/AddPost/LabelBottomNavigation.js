import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { AccountCircle, Home, MessageOutlined } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: 500,
    bottom: 0,
    position: "fixed",
    width:" 100%",
    zIndex: 99,
    justifyContent:"space-around",
    backgroundColor:"rgb(7, 94, 84)",
    boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
  },
  flex:{
    display:"flex",
    justifyContent:"space-between"
  },
  icon:{
    color:"white"
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="Home" value="home" icon={<Home/>} className={classes.icon} />
        {/* <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} /> */}
        <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircle/>}  className={classes.icon} href="/profile"/>
        <BottomNavigationAction label="Chat" value="chat" icon={<MessageOutlined/>} className={classes.icon} href="/dashboard" />
    </BottomNavigation>
  );
}
