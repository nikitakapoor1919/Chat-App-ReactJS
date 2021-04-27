import React from 'react'
import styles from './styles';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const firebase = require("firebase");

class ProfileComponent extends React.Component {

constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
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
         isOnline:false,
         users: []
    }
}
    render() {
        const {classes}=this.props
        return (
            <div className={classes.card} >
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{textAlign:'center'}}>
            {this.state.name ?
                <div className={classes.welcome} style={{textAlign:'center'}} >
                  Welcome, {this.state.name}
                </div> :null}

            {this.state.email ?
                    <Avatar alt="Profile Pic" className={classes.pic} src={this.state.url } style={{margin:'0 auto'}} >
                    {this.state.email.split('')[0]}
                    </Avatar> :
                    <Avatar className={classes.pic} 
                    src='https://raw.githubusercontent.com/nikitakapoor1919/Images/main/default-pic.png'>
                    </Avatar>
                }
            {this.state.value ?
                <div className={classes.margin} style={{fontWeight:'600'}}>
                   {this.state.value}
                </div> :  null}
            <div className={classes.margin} style={{fontWeight:'600',fontSize:'15px'}}>
                {this.state.email}
            </div> 
            {this.state.users.map((user) => (
            <List component="nav" className={classes.root} aria-label="contacts">
            {user.isOnline ?  <ListItem button>
                    <ListItemIcon style={{color:"#4caf50"}}>
                    <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText primary={user.email} />
                </ListItem>:''}
            </List>
            ))}
            </div>
          </Container>
            </div>
        )
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      }
    componentWillMount = async () => {
        firebase.auth().onAuthStateChanged(async _usr => {
        //   if(!_usr)
        //     this.props.history.push('/login');
          if(_usr){
              {this.setState({email:_usr.email})}
             await firebase
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
                        url:doc.data().pic,
                        isOnline:doc.data().isOnline
                    })
                    this.props.getStatusAbout(this.state.about,this.state.email,this.state.isOnline,this.state.name)
                    this.props.getStatusPic(this.state.url)
                console.log('Document data:', doc.data());
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
          }
      });
    }
    
    onCollectionUpdate = (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const { email,isOnline} = doc.data();
          console.log("Data",doc.id);
          users.push({
            key: doc.id,
            doc, // DocumentSnapshot
            email,
            isOnline
          });
        });
        this.setState({
          users
       });
      }
}

export default withStyles(styles)(ProfileComponent)
