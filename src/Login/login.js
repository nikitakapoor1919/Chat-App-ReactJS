import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const firebase = require("firebase");

class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email:null,
            password:null,
            loginError:''
        }
    }
    
    render() {
        const {classes}=this.props
        return (
             <Grid container component="main" className={classes.root} >
             <CssBaseline />
             <Grid item xs={false} sm={4} md={7} className={classes.image} />
             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"#f0f4f5"}}>
               <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              {
                       this.state.loginError ?
                       <Typography className={classes.errorText}>
                        Invalid Login Credentials
                       </Typography>:
                       null
             }
              <form className={classes.form} onSubmit={(e)=>this.submitLogin(e)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e)=>this.userTyping('email',e)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e)=>this.userTyping('password',e)}
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Button variant="contained" onClick={this.googleSignin} style={{marginBottom:'30px',background:'white',textTransform:'capitalize',width:'100%'}}>
                  <img src='https://raw.githubusercontent.com/nikitakapoor1919/Images/main/google.png'  alt='google' style={{height:'20px',marginRight:'5px'}}></img>
                  Sign in with Google
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" className={classes.signUpLink} variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link className={classes.signUpLink} to='/signup' variant="body2">
                      {"Don't have an account? SignUp"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
          </Grid>
        )
    }
    googleSignin=async()=>{
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result)=>{
        console.log(result)
        console.log('Success')
        
        firebase
        .firestore()
        .collection('users')
        .doc(result.user.email)
        .update({
            email:result.user.email ,
            name:result.user.displayName,
            isOnline:true,
            about:"Available",
            pic:"" 
          })
          console.log('Done Uploading Info')
        
        console.log('User'+result.user)
        console.log('Email'+result.user.email)
        console.log("name: "+ result.user.displayName)
        this.props.history.push('/dashboard')
      })
      .catch((err)=>{
        console.log(err)
        console.log('Failed To Do ')
      })
    }
    userTyping=(type,e)=>{
        switch(type){
            case 'email':
                this.setState({email:e.target.value})
                break
            case 'password':
                this.setState({password:e.target.value})
                break
            default:
                break
        }
    }

    submitLogin= (e)=>{
        e.preventDefault()
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
          firebase
          .firestore()
          .collection('users')
          .doc(this.state.email)
          .update({
              isOnline:true,
            })
            console.log('Done Uploading Info')
           this.props.history.push('/dashboard')
        },err=>{
            this.setState({loginError:'Server error'})
            console.log(err)
        })

    }
}

export default withStyles(styles)(LoginComponent)
