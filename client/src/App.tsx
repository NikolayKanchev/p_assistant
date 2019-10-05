import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/History';

import { StateProvider, useStateValue } from "./State";
import { initialState, mainReducer } from "./State/MainReducer";

import NotFound from './containers/NotFound';
import Home from './containers/Home';
import Register from './containers/Register';
import ResetPass from './containers/ResetPass';
import Signin from './containers/Signin';


import Copyright from './components/Copyright';
import AppBar from './components/AppBar';

import './App.css';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


const App: React.FC = () => {
  const [{ state }] = useStateValue();
  const user = state.user

  return (
    <div className="App">
      <StateProvider initialState={initialState} reducer={mainReducer} >
        <Router history={history}>
            <div className="Main">
              <AppBar />
              <Switch>
                { user ? (<>
                  <Route path="/" component={Home} exact/>
                </>):(<>
                  <Route path="/signin" render={() => <Signin history={history} />} />
                  <Route path="/reset-pass" component={ResetPass} />
                  <Route path="/register" render={() => <Register />}/>
                  {/* <Route path="/" render={() => <Home userID={user.uid} notes={notes} />} exact/>
                  <Route path="/add-note" render={() => <AddNote addNote={this.addNote} />}/> */}
                </>)
                }

                <Route component={ NotFound } />
              </Switch>
            </div>
            <Container component="main" maxWidth="sm">
              <Box mt={8}>
                  <Copyright />
              </Box>
            </Container>
          </Router>
        </StateProvider>
    </div>
  );
}

export default App;
