import React from 'react'
import styles from './styles';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const firebase = require("firebase");

function Transition(props) {
    return <Slide direction="down" {...props} />;
  }
class ProfileComponent extends React.Component {

constructor(props) {
    super(props)

    this.state = {
         email:null,
         setOpen:false,
         open:false
    }
}

handleClickOpen = () => {
    this.setState({
        setOpen:true,
        open:true
    })
    console.log('clicked')
  };

 handleClose = () => {
    this.setState({
        setOpen:false,
        open:false
    })
  };
    render() {
        const {classes}=this.props
        return (
            <div>
                <AppBar className={classes.appBar}>
            <Toolbar>
                <a href='/dashboard' className={classes.back}>
                <IconButton edge="start" color="inherit" onClick={this.back} aria-label="close">
                    <ArrowBackIcon/>
                </IconButton>
                </a>
                <Typography variant="h6" className={classes.title}>
                  Profile
                </Typography>
            </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {this.state.email ? <Avatar alt="Remy Sharp" className={classes.pic}>
                    {this.state.email.split('')[0]}
                </Avatar> :null}
                <div className={classes.margin} style={{marginTop:'50px'}}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Name" />
                        <EditIcon className={classes.edit}/>
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <EmailIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Email" />
                        <EditIcon className={classes.edit}/>
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <InfoIcon className={classes.icon}/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="About" />
                        <EditIcon className={classes.edit} onClick={this.handleClickOpen}/>
                    </Grid>
                    </Grid>
                </div>
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition} >
                <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      About
                    </Typography>
                </Toolbar>
                </AppBar>
                <List>
                <ListItem >
                    <ListItemText primary="Phone ringtone" secondary="Titania" />
                </ListItem>
                <Divider />
                <ListItem >
                    <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                </ListItem>
                </List>
            </Dialog>
            </div>

          </Container>
            </div>
        )
    }
    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
          if(!_usr)
            this.props.history.push('/login');
          else {
            await firebase
            .firestore()
            .collection('users')
            .where('email', 'array-contains', _usr.email)
            .onSnapshot(async res => {
              await this.setState({
                email: _usr.email,
              });
            })
          }
      });
    }
}

export default withStyles(styles)(ProfileComponent)
