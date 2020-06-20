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
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ClearIcon from '@material-ui/icons/Clear';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {storage} from  '../index'
import DialogActions from '@material-ui/core/DialogActions';
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
         open:false,
         name:null,
         value:null,
         about:null,
         alert:false,
         image:null,
         url:'',
         openPicDialog:false,
         progress:0,
         user1:''
    }
}
handleClosePic = () => {
    this.setState({openPicDialog:false})
};
    render() {
        const {classes}=this.props
        const { onClose, selectedValue, open } = this.props;
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
            <Dialog    onClose={this.handleClosePic}  aria-labelledby="simple-dialog-title" open={this.state.openPicDialog}>
                <DialogActions>
                    <Button onClick={this.handleUpload} color="primary" autoFocus>
                    Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
           {this.state.progress!==0 ? <progress value={this.state.progress} max='100'></progress>:''} 
            {this.state.alert ?    
            <Collapse in={this.state.alert}>
            <Alert
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => this.setState({alert:false})}
                style={{width:'25%',marginTop:'-20px'}}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            >
            Saved Successfully !!
            </Alert>
        </Collapse>:''} 
                {this.state.email ?
                    <Avatar alt="Profile Pic" className={classes.pic} src={this.state.url }>
                    {this.state.email.split('')[0]}
                    </Avatar> :
                    <Avatar className={classes.pic} 
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsxzjLUwOFHAGak77d2YICyOjqeLoKKH_kZbPuAeYgIhaDLzSx&usqp=CAU'>
                    </Avatar>
                }
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <input
                            type="file"
                            id='file'
                            style={{ display: "none"}}
                            ref={(ref) => this.upload = ref}
                            onChange={this.handleChangeImage}
                        />
                       <Button
                        style={{marginTop:'-40px' }}
                        onClick={()=>{this.upload.click()}}
                        //onClick={this.handleUpload}
                        >
                          <CameraAltIcon/>
                        </Button>
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle className={classes.icon} />
                    </Grid>
                    <Grid item>
                    <form className={classes.form} onSubmit={(e)=>this.submit(e)}>
                        <InputLabel htmlFor="input-with-icon-grid" style={{color:'blue',fontSize:'12px'}}>
                            Name
                        </InputLabel>
                        <TextField id="input-with-icon-grid" 
                        name="name"
                        InputProps={{style:{color:'black'}}}
                        placeholder={this.state.email ?this.state.email.split('@')[0] : this.state.name} 
                        value={this.state.name ? this.state.name :''}
                        onChange={(e)=>this.userTyping('name',e)}
                        />
                        <Button type='submit'  ><SaveIcon className={classes.edit} onClick={()=>{this.setState({alert:true})}}
                        />
                        </Button>
                      </form>      
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}style={{marginLeft:'-5px'}}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <EmailIcon className={classes.icon} />
                    </Grid>
                    <Grid item>
                        <InputLabel htmlFor="input-with-icon-grid" style={{color:'blue',fontSize:'12px'}}>Email</InputLabel>
                            <TextField id="input-with-icon-grid" 
                            name="email"
                            value={this.state.email}
                            InputProps={{style:{color:'black',width:'225px'}}}
                            disabled
                           // onChange={(e)=>this.userTyping('email',e)}
                            />
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin} style={{marginLeft:'-30px'}}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <InfoIcon className={classes.icon}/>
                    </Grid>
                    <Grid item>
                    <InputLabel htmlFor="input-with-icon-grid" style={{color:'blue',fontSize:'12px'}}>About</InputLabel>
                        <TextField id="input-with-icon-grid" disabled value={this.state.value}  InputProps={{style:{color:'black'}}}/>
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
                <form className={classes.form} onSubmit={(e)=>this.submit(e)}>
                        <InputLabel htmlFor="input-with-icon-grid" style={{color:'blue',fontSize:'15px',marginBottom:'20px'}}>Currently Set to</InputLabel>
                            <TextField id="input-with-icon-grid" 
                            name="value"
                            value={this.state.value}
                            InputProps={{style:{color:'black'}}}
                            placeholder={this.state.about}
                            onChange={(e)=>this.userTyping('value',e)}
                            multiline
                            />
                            <Button
                            onClick={()=>{this.setState({value:'',about:''})}}
                            >
                            <ClearIcon />
                            </Button>
                            <Button
                            type="submit"
                            style={{marginLeft:'70px'}}
                            >
                            <SaveIcon className={classes.edit} onClick={()=>{this.setState({alert:true,open:false})}}/>
                            </Button>
                     </form>      
                </ListItem>
                <Divider />
                <ListItem >         
                <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup aria-label="about" name="about1" value={this.state.value} onChange={this.handleChange}>
                    <FormControlLabel value="Availaible" control={<Radio />} label="Avalaible" />
                    <FormControlLabel value="Busy" control={<Radio />} label="Busy" />
                    <FormControlLabel value="At Movies" control={<Radio />} label="At Movies" />
                    <FormControlLabel value="At School" control={<Radio />} label="At School" />
                    <FormControlLabel value="In a meeting" control={<Radio />} label="In a meeting" />
                    <FormControlLabel value="Sleeping" control={<Radio />} label="Sleeping" />
                    <FormControlLabel value="Battery About to die" control={<Radio />} label="Battery About to die" />
                    <FormControlLabel value="DND" control={<Radio />} label="DND" />
                    <FormControlLabel value="At Gym" control={<Radio />} label="At Gym" />
                </RadioGroup>
                </FormControl>
                </ListItem>
                </List>
            </Dialog>

            </div>
          </Container>
            </div>
        )
    }
    handleUpload= async()=>{
        const {image}=this.state
        console.log(image.name)
        const uploadTask=storage.ref(`images/${image.name}`).put(image)
        await uploadTask.on('state_changed',
        (snapshot)=>{
          //progress fn
          const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
          this.setState({progress:progress})
        },
        (error)=>{
          console.log(error)
        },
        ()=>{
          storage.ref('images').child(image.name).getDownloadURL().then(url=>{
              console.log(url)
              this.setState({url:url})
              var uemail = firebase.auth().currentUser.email;
              firebase
              .firestore()
              .collection('users')
              .doc(uemail)
              .update({
                  pic:this.state.url ? this.state.url:'',
                })
                console.log('Done Uploading pic')
          })
        })
        this.setState({openPicDialog:false})
    }
    handleChangeImage=e=>{
        if(e.target.files[0]){
            const image=e.target.files[0]
            this.setState({image:e.target.files[0],openPicDialog:true})
            console.log(image)
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
    handleChange = (event) => {
        this.setState({value:event.target.value});
      };
    
    
    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
          if(!_usr)
            this.props.history.push('/login');
          else {
              {this.setState({email:_usr.email})}
            firebase
            .firestore().collection('users').doc(_usr.email)
           .get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                } else {
                    this.setState({
                        about:doc.data().about,
                        value:doc.data().about,
                        email:doc.data().email,
                        name:doc.data().name,
                        url:doc.data().pic
                    })
                console.log('Document data:', doc.data());
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
          }
      });
    }
    userTyping=(type,e)=>{
        switch(type){
            case 'name':
                this.setState({name:e.target.value})
                break    
            case 'value':
                    this.setState({value:e.target.value})
                    break           
            default:
                break
        }
    }

    submit=async (e)=>{
        e.preventDefault()
        var uemail = firebase.auth().currentUser.email;
        await
        firebase
        .firestore()
        .collection('users')
        .doc(uemail)
        .set({
            email:this.state.email ,
            about:this.state.value ? this.state.value :'',
            name:this.state.name ? this.state.name:'',
            pic:this.state.url ? this.state.url:'',
          })
          console.log('Done Uploading Info')
        //   .update({
        //     user1:[{
        //        about:this.state.aboutS,
        //        pic:this.state.picS
        //     }],
        //    user2:[{
        //        about:this.state.about,
        //        pic:this.state.pic
        //     }],
        //   })
        }

}

export default withStyles(styles)(ProfileComponent)
