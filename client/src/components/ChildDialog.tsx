import React, { useState } from 'react';
import { addChild, updateChild } from '../utils/FetchData';
import { Child } from '../types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateIcon from '@material-ui/icons/Create';


type DialogProps = {
    type: string;
    token: string;
    child: Child;
    reload: () => void;
    closeMenu?: () => void;
}

export default function FormDialog(props: DialogProps) {
  const { type, token, reload } = props;

  const [open, setOpen] = useState(false);
  const [child, setChild] = useState(props.child);
  const [imageName, setImageName] = useState("");

  const [errName, setErrName] = useState(false);
  const [errGender, setErrGender] = useState(false);
  const [errClothesSize, setErrClothesSize] = useState(false);
  const [errShoeSize, setErrShoeSize] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (props.closeMenu !== undefined){
      props.closeMenu();
    }
  }

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleClickSave = () => {
    handleClose();

    const data = new FormData();
    const entries = Object.entries(child);

    if (type === "add"){
      for (let [key, value] of entries) {
        data.append(key, value);
      }

      addChild(data, token).then(() => {
        handleClose();
          reload();
      });
    }

    if (type === "update"){
      
      for (let [key, value] of entries) {
        if ( key !== "_id" && key !== "user"){
          data.append(key, value);
        }
      }

      updateChild(data, token, child._id).then(() => {
        handleClose();
        if(props.reload !== undefined){
          props.reload();
        }
      });
    }
  }

  const handleChange = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget;

    const childToUpdate: Child = child;

    switch(name){
      case "image":          
        childToUpdate.img = e.currentTarget.files[0];
        setImageName(e.currentTarget.files[0].name);
        break;
      case "name":
        childToUpdate.name = value;
        if (value === ""){
          setErrName(true);
        }else{
          setErrName(false);
        }
        break;
      case "birthdate":
          childToUpdate.birthdate = value;
        break;
      case "gender":
          childToUpdate.gender = value;
          if (value === ""){
            setErrGender(true);
          }else{
            setErrGender(false);
          }
        break;
        case "clothesSize":
          childToUpdate.clothesSize = value;
          if (value === ""){
            setErrClothesSize(true);
          }else{
            setErrClothesSize(false);
          }
        break;
        case "shoeSize":
          childToUpdate.clothesSize = value;
          if (value === ""){
            setErrShoeSize(true);
          }else{
            setErrShoeSize(false);
          }
        break;
    }

    setChild(childToUpdate);
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        { type === "add" ? <AddBoxIcon /> : <CreateIcon/>}
        
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
        <form className="form" noValidate>
            <DialogContent>
                <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    error={errName}
                    value={child.name}
                    onChange={handleChange}
                />
                  {/* Date here */}

                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    autoComplete="gender"
                    autoFocus
                    error={errGender}
                    value={child.gender}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="clothesSize"
                    label="Clothes Size"
                    name="clothesSize"
                    autoComplete="clothesSize"
                    error={errClothesSize}
                    value={child.clothesSize}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="shoeSize"
                    label="Shoe Size"
                    name="shoeSize"
                    autoComplete="shoeSize"
                    error={errShoeSize}
                    value={child.shoeSize}
                    onChange={handleChange}
                />
                <input
                    accept="image/*"
                    style={{display: "none"}}
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                />
                <label htmlFor="image">
                    <Button variant="contained" component="span">
                        Upload
                    </Button> {    }
                    <span>{imageName}</span>
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                { errName || errGender || errShoeSize || errClothesSize === undefined ? 
                <Button 
                    disabled
                    variant="contained"
                    className="submit" 
                    color="primary"
                >
                    Save
                </Button>
                : (
                <Button 
                    variant="contained"
                    className="submit" 
                    color="primary"
                    onClick={handleClickSave}
                >
                    Save
                </Button>
                )}
            </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}