import React, { useState } from 'react';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Message from '../../components/Message';
import { validateEmail } from '../../utils/Validators';
import { RouteComponentProps } from 'react-router';

const ResetPass: React.FC<RouteComponentProps> = (props) => {
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const displayError = (message: string) => {
    setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage("");
        }, 5000);
  }

  const displaySuccessMessage = (message: string) => {
    setSuccessMessage(message)
      setTimeout(() => {
        setSuccessMessage("");
        }, 5000);
  }

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    
    if(email === ""){ setErrEmail(true); }

    if(!errEmail && email !== ""){ 
      axios.post("http://localhost:4000/users/resetPass", { email: email })
      .then(res => {
        if (res.status === 200){
          displaySuccessMessage("Soon you'll receive an email with a link that will alow you to reset your password!");
        }else{
          displayError("Something went wrong! Try again!")
        }
      })
      .catch(err => {
        displayError(err.message);
      })
    }else{
      displayError("Invalid email!")
    }
  }

  const handleChange = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget;

    switch(name){
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar" style={{ margin: "1vh", backgroundColor: "#e91e63", marginTop: "90px", marginLeft: "45%"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{marginTop: "20px", marginBottom: "20px"}}>
          Reset Your Password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            style={{ margin: "20px 0 20px 0"}}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>

    <Container component="main" maxWidth="sm">
      <Box mt={25}>
        { errorMessage !== "" ?
          (<Message message={errorMessage} variant="error"/>) : null
        }
        { successMessage !== "" ? 
          (<Message message={successMessage} variant="success"/>) : null
        }
      </Box>        
    </Container>
  </>
  );
}

export default ResetPass;