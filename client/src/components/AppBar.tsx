import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from "../State";

import Menu from './Menu';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    background: {
      background: 'linear-gradient(to left, #3494e6, #ec6ead)'
    }
  }),
);

export default function ButtonAppBar() {
  const {root, title, background} = useStyles();
  const [ { state } ] = useStateValue();

  const displayName = state.user !== undefined? state.user.displayName: "";

  return (
    <div className={root}>
      <AppBar className={background} position="static">
        <Toolbar>
            <Menu buttonName={"menu"} menuItems={["home", "Shared With Me", "Transfer"]}/>
            <Typography variant="h6" className={title}>
              <Link style={{textDecoration: 'none', color: 'inherit'}} to="/">Parents' Assistant</Link>
            </Typography>

            {displayName === "" || displayName === undefined ? 
            (<>
              <Button color="inherit"><Link style={{textDecoration: 'none', color: 'inherit'}} to="/signin">Login</Link></Button>
            </>) :(<>
              <Menu buttonName={displayName[0]} menuItems={["logout"]} />
            </>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}