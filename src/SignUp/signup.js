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

class SignupComponent extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:null,
             password:null,
             passwordConfirmation:null,
             signupError:''
        }
    }
    
    render() {
        const {classes}=this.props
        return (
          <div  style={{background:'url(https://images.squarespace-cdn.com/content/v1/5cb06a6cd7456246c1156693/1555335589603-NB3CQ3AHR6SFMOUOUDNZ/ke17ZwdGBToddI8pDm48kN12xG-HbjuR-TIg6OJnzNAUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z28Bb07hTaLvQAh-Yxhh8tF7jXoU-0BQhSBP3PCqw3kcShHAH51QaxKq4KdVMVBxpG/Hayls+World+-+Whatsapp+Background+-+01.jpg)',height:'100vh',position:'absolute',top:0,width:'100%'}}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              {
                     this.state.signupError ? 
                     <Typography className={classes.errorText} component='h5' variant='h6'>
                      {this.state.signupError}
                     </Typography>:
                     null
              }
              <form className={classes.form} onSubmit={(e)=>this.SubmitSignup(e)}>
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
                 <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="current-password"
                  onChange={(e)=> this.userTyping('passwordConfirmation',e)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link className={classes.logInLink} to='/login' variant="body2">
                      {"Already have an account? SignIn"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          </div>

        )
    }
    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    userTyping=(type,e)=>{
      switch(type){
          case 'email':
              this.setState({email:e.target.value})
              break
          case 'password':
              this.setState({password:e.target.value})
              break  
          case 'passwordConfirmation':
               this.setState({passwordConfirmation:e.target.value})
               break      
          default:
               break
      }
    }

    SubmitSignup=(e)=>{
          e.preventDefault()
          if(!this.formIsValid()){
              this.setState({signupError:'Password do not Match'})
              return
          }
         
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email,this.state.password)
          .then(authRes=>{
              const userObj={
                  email:authRes.user.email
              }
              firebase
              .firestore()
              .collection('users')
              .doc(this.state.email)
              .set(userObj)
              .then(()=>{
                  this.props.history.push('/dashboard')
              },dbError=>{
                console.log(dbError)
                this.setState({signupError:'Failed to add User'})
              })
          },authError=>{
              console.log(authError)
              this.setState({signupError:'Failed to add User'})
          })
    }
}

export default withStyles(styles)(SignupComponent)
