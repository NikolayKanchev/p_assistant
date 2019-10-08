import React, { useState } from 'react';
import { useStateValue } from "../State";
import { logout } from  "../State/user/Actions";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() =>
  createStyles({
    loggedIn: {
      color: "#c62828",
      backgroundColor: "white",
      opacity: 0.7,
      padding: "0 8px 0 8px",
      borderRadius: "50%",
    },
    normal: {
        color: "white"
    },
    menu: {
        color: "white",
        marginTop: "8px"
    }
  }),
);

const variantIcon = {
    menu: MenuIcon
};

interface CustomProps{
    variant: keyof typeof variantIcon;
}


export default function SimpleMenu(prop: {buttonName: string, menuItems: Array<string>}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const { buttonName, menuItems } = prop;
  const { loggedIn, normal, menu } = useStyles();
  const [redirectTo, setRedirectTo] = useState("");

  const [ , dispatch ] = useStateValue();
  

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setRedirectTo("/signin");  
    setAnchorEl(null);
    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  }

  return (
    <>
    { redirectTo !== "" ? <Redirect to={redirectTo} /> : null}
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {buttonName.length === 1? 
          <><h3 className={loggedIn}>{buttonName}</h3></>: 
          (buttonName === "menu"? <><div className={menu}><MenuIcon/></div></> :
          <><div className={normal}>{buttonName}</div></>)
          }
        
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {menuItems.map((item: string, index) => {
              const itemName = item.charAt(0).toUpperCase() + item.slice(1)
              if (itemName === "Logout"){
              return(
                <MenuItem key={index} onClick={handleLogout}>{itemName}</MenuItem>                    
              )
              }else{
                const path = item.toLowerCase().replace(/ /g, "-");                
                return(
                    <MenuItem key={index} onClick={handleClose}><Link style={{textDecoration: "none"}} to={path}>{itemName}</Link></MenuItem>                    
                  ) 
              }
          })}
      </Menu>
    </div>
    </>
  );
}