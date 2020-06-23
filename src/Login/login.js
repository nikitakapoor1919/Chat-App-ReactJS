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
            <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWUxinfXVrs0myOQO3Nkjgv1cct1VklsUBEkP54pSBBw6-nokz&usqp=CAU'  alt='...' style={{height:'20px',marginRight:'5px'}}></img>
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
          </Container>
        )
    }
    googleSignin=()=>{
      
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result)=>{
        console.log(result)
        console.log('Success')
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

    submitLogin=(e)=>{
        e.preventDefault()

        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
           this.props.history.push('/dashboard')
        },err=>{
            this.setState({loginError:'Server error'})
            console.log(err)
        })

    }
}

export default withStyles(styles)(LoginComponent)
