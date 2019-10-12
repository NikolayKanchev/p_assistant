import React, { useState } from 'react';
import { addItem } from '../utils/FetchData';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Category, Authorization } from '../types';

type DialogProps = {
    closeDialog: () => void;
    category: Category;
    authorization: Authorization;
}

export default function FormDialog(props: DialogProps) {
  const {closeDialog, category, authorization} = props;

  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [errPrice, setErrPrice] = useState(false);
  const [image, setImage] = useState();

  const handleClose = () => {
    setOpen(false);
    closeDialog();
  };

  const handleSubmit = () => {
    const data = new FormData() 
    data.append('category', category._id);
    data.append('name', name);
    data.append('size', size);
    data.append('price', price);
    data.append('img', image);

    const res = addItem(data, authorization);
    console.log(res);
    handleClose();
  }

  const handleChange = (e: React.FormEvent<any>) => {
    const { name, value } = e.currentTarget;

    switch(name){
      case "image":
        setImage(e.currentTarget.files[0]);        
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <form className="form" onSubmit={handleSubmit} noValidate>
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
                    // required
                    fullWidth
                    id="size"
                    label="Size"
                    name="size"
                    // autoComplete="size"
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
                    <span>{image !== undefined ? image.name : ""}</span>
                </label>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                { errName || errPrice || image === undefined ? 
                <Button 
                    // type="submit"
                    disabled
                    variant="contained"
                    className="submit" 
                    // onClick={handleClose} 
                    color="primary"
                >
                    Save
                </Button>
                : (
                <Button 
                    type="submit"
                    variant="contained"
                    className="submit" 
                    // onClick={handleClose} 
                    color="primary"
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