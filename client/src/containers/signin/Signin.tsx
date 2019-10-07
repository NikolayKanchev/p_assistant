import React, { useState } from 'react';
import axios from 'axios';

import Message from '../../components/Message';
import { validatePass, validateEmail } from '../../components/Validators';
import { useStateValue } from "../../State";
import { login } from  "../../State/user/Actions";

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
import { Link, Redirect } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errPass, setErrPass] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState("");

  const [ ,dispatch ] = useStateValue();

  const displayError = (message: string) => {
    setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage("");
        }, 5000);
  }

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    
    if(email === ""){ setErrEmail(true); }
    if(password === ""){ setErrPass(true); }    

    if(!errPass && !errEmail && email !== "" && password !== ""){ 
      axios.post("http://localhost:4000/users/login", { email: email, password: password })
      .then(res => {
        if (res.status === 200){
          // localStorage.setItem('token', token);
          const { userId, displayName, token } = res.data
          dispatch(login({id: userId, displayName: displayName, token: token}));
          setRedirectTo('/');
        }else{
          displayError("Something went wrong! Try again!")
        }
      })
      .catch(err => {
        displayError(err.message);
      })
    }else{
      displayError("Your email or password are invalid!")
    }
  }

  const handleChange = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget;

    switch(name){
      case "password":
        setPassword(value);
        if (!validatePass(value)){
          setErrPass(true);
        }else{
          setErrPass(false);
        }
        break;
      case "email":
        setEmail(value);
        if (!validateEmail(value)){
          setErrEmail(true);
        }else{
          setErrEmail(false);
        }
        break;
    }
  }
  return (
  <>
  { redirectTo !== "" ? <Redirect to={redirectTo} /> : null}
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className="paper">
      <Avatar className="avatar" style={{ margin: "1vh", backgroundColor: "#e91e63", marginTop: "90px", marginLeft: "45%"}}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" style={{marginTop: "10px", marginBottom: "10px"}}>
        Sign in
      </Typography>
      <form className="form" onSubmit={handleSubmit} noValidate>
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
          error={errEmail}
          value={email}
          onChange={handleChange}
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
          error={errPass}
          value={password}
          onChange={handleChange}
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
    { errorMessage !== "" ? 
      (<Message message={errorMessage} variant="error"/>) : null
    }
  </Box>
  </Container>
  </>
  )
}

export default SignIn;