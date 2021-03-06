
import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Avatar from '@material-ui/core/Avatar';
import {storage} from  '../index'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import moment from 'moment'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Divider, Link } from '@material-ui/core';
import LabelBottomNavigation from './LabelBottomNavigation';
import Drawer from './Drawer';
import { SettingsInputAntennaOutlined } from '@material-ui/icons';
const firebase = require("firebase");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent:"center",
    fontSize:"1.3rem"
  },
  margin: {
    margin: theme.spacing(1),
    position:'fixed',
    bottom:60,
    right:0,
  },
  pic: {
    color: '#fff',
    backgroundColor: '#4caf50',
    textTransform:'uppercase',
    width: '40px',
    height: '40px',
    fontSize:'15px',
    border:'1px solid #534f4f;'
  },
  link:{
    textDecoration:"none",
    color:"white",
    marginTop:"10px"
  }
}));


const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const signOut = () => firebase.auth().signOut();
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openD, setOpen] = React.useState(false);
  const [progress,setProgress]=React.useState(0)
  const [desc,setDesc]=React.useState('')
  const [image,setImage]=React.useState('')
  const [chars]=React.useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
  const [autoId,setId]=React.useState(false)
  const [UId,setUId]=React.useState(null)
  
  const addDescp=(value)=>{
    setDesc(value)
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const uniqueId=()=>{
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let autoid=''
    for (let i = 0; i < 20; i++) {
      autoid += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    console.log(autoid)
    setId(true)
    setUId(autoid)
  }
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if(autoId==false){
      uniqueId()
    }
  });
  const submit=async (e)=>{
    e.preventDefault()
    var uemail = firebase.auth().currentUser.email;
    await
    uniqueId()
    await
    firebase
    .firestore()
    .collection('posts')
    .doc('post')
    .update({
      posts: firebase.firestore.FieldValue.arrayUnion({
        email:props.email ,
        Description:desc ? desc :'',
        Image:image ? image:'',
        timestamp:Date.now(),
        uid:autoId ? UId:uniqueId(),
    }),
    });
    await
    firebase
    .firestore()
    .collection('likes')
    .doc(UId)
    .set({
        like:0,
        uid:UId
    });
    await
    firebase
    .firestore()
    .collection('comments')
    .doc(UId)
    .set({
        totalComment:0,
        commentsPost:[],
        url:'/'+UId
    });
    // await
    // firebase
    // .firestore()
    // .collection('posts')
    // .doc(props.email)
    // .update({
    //   posts: firebase.firestore.FieldValue.arrayUnion({
    //     email:props.email ,
    //     Description:desc ? desc :'',
    //     Image:image ? image:'',
    //     timestamp:Date.now(),
    //     uid:UId,
    // }),
    // });
      setOpen(false);
      console.log('Done Uploading Info')
      window.location.reload();
    }
    const  userTyping=(type,e)=>{
      switch(type){
          case 'write':
             addDescp(e.target.value)
              break
          default:
              break
      }
  }
 const  handleUpload= async()=>{
    console.log(image.name)
    const uploadTask=storage.ref(`images/${image.name}`).put(image)
    await uploadTask.on('state_changed',
    (snapshot)=>{
      //progress fn
      const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
      setProgress(progress)
    },
    (error)=>{
      console.log(error)
    },
    ()=>{
      storage.ref('images').child(image.name).getDownloadURL().then(url=>{
          console.log(url)
          setImage(url)
          var uemail = firebase.auth().currentUser.email;
          firebase
          .firestore()
          .collection('users')
          .doc(uemail)
          .update({
              image:props.url ? props.url:'',
            })
            console.log('Done Uploading pic')
      })
    })
}
const handleClose=()=>{
  setAnchorEl(null);
}
const handleChangeImage=e=>{
    if(e.target.files[0]){
        const image=e.target.files[0]
        setImage(e.target.files[0])
        console.log(image)
    } 
}
  
  return (
    <div className={classes.root}>
      <AppBar style={{background:'#075E54',height:84,position:'fixed',top:0}}>
        <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
        <Toolbar>
            <div style={{marginTop:10}}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >
                {props.email ?
                    <Avatar alt="Profile Pic" className={classes.pic} src={props.url }>
                    {props.email.split('')[0]}
                    </Avatar> :
                    <Avatar className={classes.pic} 
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsxzjLUwOFHAGak77d2YICyOjqeLoKKH_kZbPuAeYgIhaDLzSx&usqp=CAU'>
                    </Avatar>
                }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              <MenuItem>
              <a href='/profile' style={{ width: '100%', textDecoration: 'none',color:'black'}}>Profile</a>
              </MenuItem>
              <MenuItem>
              <a href='/dashboard' style={{ width: '100%', textDecoration: 'none',color:'black'}}>Chat</a>
              </MenuItem>
              <MenuItem  onClick={signOut}>
                  SignOut
              </MenuItem>
              </Menu>
            </div>
        </Toolbar>
        <Toolbar variant="h6" className={classes.title}>
                   Let's Chat
        </Toolbar>
        {/* <Toolbar>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                 <MoreVertIcon/>
              </IconButton>
        </Toolbar> */}
        <Toolbar>
                <Drawer email={props.email}/>
        </Toolbar>
        </Toolbar>
      </AppBar>
      {/* <Fab  aria-label="add" style={{backgroundColor: '#128C7E',color:"white",bottom:120}} className={classes.margin}>
          <Link className={classes.link} href="/dashboard"><MessageOutlinedIcon className={classes.add}/></Link>
      </Fab> */}
      <Fab caria-label="add" style={{backgroundColor:"rgb(7, 94, 84)",color:"white"}} className={classes.margin}>
          <AddIcon onClick={handleClickOpen} />
      </Fab>
      <LabelBottomNavigation/>
      <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={openD}>
        <div>
          <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog} style={{textAlign:'center',fontWeight:"700",fontSize:"1.5rem"}}>
            ADD NEW POST
          </DialogTitle>
          <Divider/>
            <DialogContent style={{width:500}}>
            {progress!==0 ? <progress value={progress} max='100'></progress>:''} 
              <input
                  type="file"
                  id='file'
                  style={{marginLeft:'40%'}}
                  onChange={handleChangeImage}
              />
              <Button
              style={{marginLeft:'40%'}}
              onClick={handleUpload}
              >
                <CameraAltIcon/>
              </Button>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="name"
                label="Write Something..."
                fullWidth
                multiline
                rows="4"
                onChange={(e)=>userTyping('write',e)}
                multiline
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={submit} color="primary">
                POST
              </Button>
            </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
