import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" className={classes.signUpLink} variant="body2">
                      Forgot password?
                    </Link>
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
            // <main className={classes.main}>
            //    <CssBaseline></CssBaseline>
            //    <Paper className={classes.paper}>
            //        <Typography component='h1' variant='h5'>
            //            Log In <FontAwesomeIcon icon={faSignInAlt}/>
            //        </Typography>
            //        {
            //            this.state.loginError ?
            //            <Typography className={classes.errorText}>
            //             Invalid Login Credentials
            //            </Typography>:
            //            null
            //        }
            //        <form className={classes.form} onSubmit={(e)=>this.submitLogin(e)}>
            //            <FormControl required fullWidth margin='normal'>
            //                <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
            //                <Input  autoComplete='email' autoFocus id='login-email-input' onChange={(e)=>this.userTyping('email',e)}>
            //                </Input>
            //            </FormControl>
            //            <FormControl required fullWidth margin='normal'>
            //                <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
            //                <Input type='password' id='login-password-input' onChange={(e)=>this.userTyping('password',e)}>
            //                </Input>
            //            </FormControl>
            //            <Button type='submit' fullWidth variant='contained' color='primary' classname={classes.submit}>
            //                Log In
            //            </Button>
            //        </form>
                 
            //        <Typography className={classes.noAccountHeader}>
            //          <br></br>Don't Have an account ?&nbsp;
            //          <Link className={classes.signUpLink} to='/signup'> SignUp</Link>
            //      </Typography>
            //    </Paper>
            // </main>
        )
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
