import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import { validateEmail, validatePass, validateName } from '../components/Validators';
import Message from '../components/Message';
 
interface MyProps {
}

interface MyState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  errFN: boolean,
  errLN: boolean,
  errEmail: boolean,
  errPass: boolean,
  errorMessage: string,
}

class SignUp extends Component<MyProps, MyState>{
  constructor( props: MyProps ){
    super( props );

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errFN: false,
      errLN: false,
      errEmail: false,
      errPass: false,
      errorMessage: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e: React.FormEvent<any>){
    e.preventDefault();

    const registrationInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    }

    if(validateName(registrationInfo.firstName) 
        && validateName(registrationInfo.firstName) 
        && validateEmail(registrationInfo.email) 
        && validatePass(registrationInfo.password))
    {
    //   firebase.auth().createUserWithEmailAndPassword(
    //     registrationInfo.email,
    //     registrationInfo.password
    //   )
    //   .then(() => {
    //     this.props.registerUser(registrationInfo.firstName);
    //   })
    //   .catch((err: { message: any; }) => {
    //     if(err.message !== null){
    //       this.setState({errorMessage: err.message});        
    //     }else{
    //       this.setState({errorMessage: ""});
    //     }
    //   })
    // }else{
    //   this.setState({
    //     errorMessage: "There is an error. Please check your input !"
    //   })
    }
  }


  handleChange(e: React.FormEvent<any>){
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value
    } as Pick<MyState, keyof MyState>, () => {

      if (!validateEmail(this.state.email)){
        this.setState({errEmail: true});
      }else{
        this.setState({errEmail: false});
      }

      if (!validateName(this.state.firstName)){
        this.setState({errFN: true});
      }else{
        this.setState({errFN: false});
      }

      if (!validateName(this.state.lastName)){
        this.setState({errLN: true});
      }else{
        this.setState({errLN: false});
      }

      if (!validatePass(this.state.password)){
        this.setState({errPass: true});
      }else{
        this.setState({errPass: false});
      }
    });
  } 

  render() {
    return (
      <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar" style={{ margin: "1vh", backgroundColor: "#e91e63", marginTop: "65px", marginLeft: "45%"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{marginTop: "10px", marginBottom: "20px"}}>
            Sign up
          </Typography>
          <form className="form" onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  error={this.state.errFN}
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  error={this.state.errLN}
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={this.state.errEmail}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              style={{ margin: "15px 0 20px 0"}}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end" style={{ marginTop: '10px'}}>
              <Grid item>
                  <Link to="/signin" style={{textDecoration: 'none', color: 'inherit'}}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>

      <Container component="main" maxWidth="sm">
        <Box mt={6}>
          { this.state.errorMessage !== "" ? 
            (<Message message={this.state.errorMessage} variant="error"/>) : null
          }
        </Box>
      </Container>
      </>
    );
  }
}

export default SignUp;