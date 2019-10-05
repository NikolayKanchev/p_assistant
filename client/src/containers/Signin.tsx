import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import { validatePass, validateEmail } from '../components/Validators';

interface MyProps {
  history: any;
}

interface MyState {
  email: string;
  password: string;
  errPass: boolean;
  errEmail: boolean;
  errorMessage: string;
}

class SignIn extends Component<MyProps, MyState> {

  constructor( props: MyProps ){
    super( props );
 
    this.state = {
      email: "",
      password: "", 
      errPass: false,
      errEmail: false,
      errorMessage: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e: React.FormEvent<any>){

    const registrationInfo = {
      email: this.state.email,
      password: this.state.password,
    }

    e.preventDefault();

    
    // firebase.auth().signInWithEmailAndPassword(
    //   registrationInfo.email,
    //   registrationInfo.password
    // )
    // .then(() =>{
    //   this.props.history.push("/") -----------------------------------------------------
    // })
    // .catch((err: { message: any; }) => {
    //   if(err.message !== null){
    //     this.setState({errorMessage: err.message});
                
    //   }else{
    //     this.setState({errorMessage: ""});
    //   }
    // })
  }


  handleChange(e: React.FormEvent<any>){
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value
    } as Pick<MyState, keyof MyState>, () => {

      if (!validatePass(this.state.password)){
        this.setState({errPass: true});
      }else{
        this.setState({errPass: false});
      }

      if (!validateEmail(this.state.email)){
        this.setState({errEmail: true});
      }else{
        this.setState({errEmail: false});
      }
    });

  }
  render() {
    return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar" style={{ margin: "1vh", backgroundColor: "#e91e63", marginTop: "90px", marginLeft: "45%"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{marginTop: "10px", marginBottom: "10px"}}>
          Sign in
        </Typography>
        <form className="form" onSubmit={this.handleSubmit} noValidate>
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
            error={this.state.errEmail}
            value={this.state.email}
            onChange={this.handleChange}
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
            error={this.state.errPass}
            value={this.state.password}
            onChange={this.handleChange}
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
            className="submit"
            style={{ margin: "10px 0 20px 0"}}
          >
            Sign In
          </Button>
          <Grid container style={{ marginTop: '10px'}}>
            <Grid item xs style={{textAlign: 'left'}}>
                <Link to="/reset-pass" style={{textDecoration: 'none', color: 'inherit'}}>Forgot password?</Link>
            </Grid>
            <Grid item>
                <Link to="/register" style={{textDecoration: 'none', color: 'inherit'}}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    <Container component="main" maxWidth="sm">
    <Box mt={8}>
      { this.state.errorMessage !== "" ? 
        (<Message message={this.state.errorMessage} variant="error"/>) : null
      }
  </Box>
  </Container>
  </>
  )}
}

export default SignIn;