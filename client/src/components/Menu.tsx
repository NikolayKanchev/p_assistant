import React from 'react';
import { Link } from 'react-router-dom';
import { MenuProps } from '../types';
import ChildDialog from '../components/ChildDialog';
import { deleteChild } from '../utils/FetchData';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';


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
        marginTop: "8px",
    },
    flex: {
      display: "flex",
      fontSize: "22",
    }
  }),
);

const SimpleMenu = (props: MenuProps) =>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const { buttonName, menuItems } = props;
  const { loggedIn, normal, menu, flex } = useStyles();  

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (props.logout !== undefined){
      props.logout();
    }
    setAnchorEl(null);
  }

  const reload = () => {
    if (props.reloadChildren !== undefined){
      props.reloadChildren()
    }
  }

  const handleDeleteChild = () => {
    if (props.token !== undefined && props.child !== undefined){
      deleteChild(props.token, props.child._id);
    }
  }

  return (
    <>
    <div>
      <span aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {buttonName.length === 1? 
          <h3 className={loggedIn}>{buttonName}</h3>: 
          (buttonName === "menu"? <div className={menu}><MenuIcon/></div> :
          <div className={normal}>{buttonName}</div>)
          }
      </span>
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
              }else if (itemName === "Edit Child" && props.child !== undefined && props.token !== undefined){
                return(
                  <div key={index} className={flex}>
                    <ChildDialog  type="update" token={props.token} child={props.child} reload={() => reload()} closeMenu={() => setAnchorEl(null)}/>
                  </div>
                )
              }else if (itemName === "Delete Child" && props.child !== undefined && props.token !== undefined){
                return(
                  <MenuItem key={index} onClick={handleDeleteChild}>{itemName}</MenuItem>                    
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

export default SimpleMenu;