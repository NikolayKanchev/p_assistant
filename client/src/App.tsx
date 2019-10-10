import React, { useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './utils/History';

import NotFound from './containers/notFound/NotFound';
import Home from './containers/home/Home';
import Register from './containers/register/Register';
import ResetPass from './containers/resetPass/ResetPass';
import UpdatePass from './containers/resetPass/UpdatePass';
import Signin from './containers/signin/Signin';

import Copyright from './components/Copyright';
import AppBar from './components/AppBar';

import './App.css';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { User } from './types';


const App: React.FC = () => {
  const [user, setUser] = useState();
  const [redirectTo, setRedirectTo] = useState("");

  console.log(user);
  
  const setUserState = (user: User) => {
    setUser(user);    
  }

  const logout = () => {
    setUser(undefined);
    setRedirectTo("/signin");
  }
  
  return (
    <div className="App">
        <Router history={history}>
          { redirectTo !== "" ? <Redirect to={redirectTo} /> : null}
            <div className="Main">
              <AppBar user={user} logout={logout}/>
              <Switch>
                { user !== undefined ? (<>
                    <Route path="/" render={() => <Home user={user}/>} exact/>
                    <Redirect path="/home" to="/" exact/>
                  </>): (<>
                    <Route path="/signin" render={() => <Signin setUserState={setUserState}/>} />
                    <Route path="/reset-pass" component={ResetPass} />
                    <Route path="/updatePass/:token" component={UpdatePass} />
                    <Route path="/register" render={() => <Register />}/>
                  </>)}
                <Route component={ NotFound } />
              </Switch>
            </div>
            <Container component="main" maxWidth="sm">
              <Box mt={8}>
                  <Copyright />
              </Box>
            </Container>
          </Router>
    </div>
  );
}

export default App;
