import React from 'react'
import styles from './styles';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';


const firebase = require("firebase");

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
         isOnline:false
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
            </div>
          </Container>
            </div>
        )
    }
    
    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
        //   if(!_usr)
        //     this.props.history.push('/login');
          if(_usr){
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
}

export default withStyles(styles)(ProfileComponent)
