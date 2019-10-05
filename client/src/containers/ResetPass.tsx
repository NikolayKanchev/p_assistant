import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Message from '../components/Message';
import { validateEmail } from '../components/Validators';

interface MyProps {

}

interface MyState {
  email: string;
  errEmail: boolean;
  errorMessage: string;
}

class ResetPass extends Component<MyProps, MyState> {

  constructor( props: MyProps ){
    super( props );
 
    this.state = {
      email: "",
      errEmail: false,
      errorMessage: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e: React.FormEvent<any>){
    e.preventDefault();
    // let email = this.state.email;
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
    });
  }

  render(){
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
        { this.state.errorMessage !== "" ?
          (<Message message={this.state.errorMessage} variant="error"/>) : null
        }
    </Box>
    </Container>
    </>
    );
  }
}

export default ResetPass;