import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from './Avatar';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    background: {
      backgroundColor: 'aliceblue',
      color: 'black',
    },
    list: {
      display: "flex",
      justifyContent: "center"
    },
    chosen: {
      backgroundColor: "rgb(96, 47, 176, 0.12)"
    }
  }),
);

type Child = {
    _id: string,
    name: string,
    user: string,
    birthdate: string,
    gender: string,
    clothesSize: string,
    shoeSize: string,
    img: string
}

type MyProps = {
  children: Array<Child>,
  handleChangeChild(child: Child):void,
  chosenChild: Child
}

const ChildrenList: React.FC<MyProps> = ( props: MyProps ) => {
  const {root, background, list, chosen} = useStyles();
  const { children, handleChangeChild, chosenChild } = props;
  

  return (
    <div className={root}>
      <AppBar className={background} position="static">
        <div className={list}>
          { children !== undefined? 
              children.map((child:Child)=> {
                  return (
                    <div key={child._id}>
                    { chosenChild._id === child._id?
                      <Button className={chosen}>
                        <div>
                          <Avatar img={child.img} name={child.name}/>
                        </div>
                      </Button>
                      :
                      <Button onClick={ () => handleChangeChild(child) }>
                        <div>
                          <Avatar img={child.img} name={child.name}/>
                        </div>
                      </Button>
                    }
                    </div>
                  )                       
              })
          : null }
        </div>    
      </AppBar>
      
    </div>
  );
}

export default ChildrenList