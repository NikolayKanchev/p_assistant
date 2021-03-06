import React, { useState, useEffect } from 'react';
import { addItem, updateItem } from '../utils/FetchData';
import { Item } from '../types';

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
    categoryId: string;
    token: string;
    item?: Item;
    reload?: () => void;
}

export default function FormDialog(props: DialogProps) {
  const { type, categoryId, token } = props;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [errPrice, setErrPrice] = useState(false);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let subscribed = true;

    if (props.item !== undefined){
      const { name, size, price, img } = props.item;
      if(subscribed){
        setName(name);
        setSize("" + size);
        setPrice("" + price);
        setImageName(img.split("\\")[1]);
      }
    }
    return () => { subscribed = false; }
  }, [setName, setSize, setPrice, setImage, props.item]);

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleClickSave = () => {
    const data = new FormData();
    data.append('category', categoryId);
    data.append('name', name);
    data.append('size', size);
    data.append('price', price);
    data.append('img', image);    
    
    if (props.type === "add"){
      addItem(data, token).then(() => {
        if(props.reload !== undefined){
          props.reload();
        }
      });
    }
    if (props.item !== undefined){
      data.append('imgName', imageName);
      updateItem(data, token, props.item._id).then(() => {
        if(props.reload !== undefined){
          props.reload();
        }
      });
    }
    
    handleClose();
  }

  const handleChange = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget;

    switch(name){
      case "image":          
        setImage(e.currentTarget.files[0]);
        setImageName(e.currentTarget.files[0].name);
        break;
      case "name":
        setName(value);
        if (value === ""){
          setErrName(true);
        }else{
          setErrName(false);
        }
        break;
      case "size":
        setSize(value);
        break;
      case "price":
        setPrice(value);
        if (value === ""){
          setErrPrice(true);
        }else{
          setErrPrice(false);
        }
        break;
    }
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
                    value={name}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="size"
                    label="Size"
                    name="size"
                    autoComplete="size"
                    value={size}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    autoComplete="price"
                    error={errPrice}
                    value={price}
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
                { errName || errPrice || image === undefined ? 
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
                    // type="submit"
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