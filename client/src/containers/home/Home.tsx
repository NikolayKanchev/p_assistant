import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useStateValue } from '../../State';
import axios from 'axios';
import ChildrenList from '../../components/ChildrenList';
import MainContent from '../../components/MainContent';
import { Child } from '../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: "10px"
    },
    hidden: {
        visibility: "hidden",
        margin: "10px"
    },
    card: {
        margin: "10px"
    }
  }),
);

const Home: React.FC = () => {

    const itemsArr = [
        {
            _id: "12345678",
            category: "98765432",
            name: "Ecco",
            size: 26,
            price: 255,
            img: "uploads/1570057655279Emma.jpg"
        },
        {
            _id: "12345678",
            category: "98765432",
            name: "Boss",
            size: 26,
            price: 255,
            img: "uploads/1570057655279Emma.jpg"
        },
        {
            _id: "12345678",
            category: "98765432",
            name: "Nike",
            size: 26,
            price: 255,
            img: "uploads/1570057655279Emma.jpg"
        },
        {
            _id: "12345678",
            category: "98765432",
            name: "Addidas",
            size: 26,
            price: 255,
            img: "uploads/1570057655279Emma.jpg"
        },
        {
            _id: "12345678",
            category: "98765432",
            name: "Tommy Hilfiger",
            size: 26,
            price: 255,
            img: "uploads/1570057655279Emma.jpg"
        }
    ]

    const categotiesArr = [
        {
            name: "Toys",
            _id: "5d952e30790c67903092f900",
            child: "5d952db7790c67903092f8fb",
        },
        {
            name: "Shoes",
            _id: "5d952e30790c67903092f901",
            child: "5d952db7790c67903092f8fb",
        },
        {
            name: "Clothes",
            _id: "5d952e30790c67903092f902",
            child: "5d952db7790c67903092f8fb",
        }
    ]

  const childrenArr = [
    {
      _id: "5d952db7790c67903092f8fb",
      user: "5d94a4d181e5d7bcd020b8e7",
      name: "Emma Alexandra",
      birthdate: "21-04-2018",
      gender: "girl",
      clothesSize: "92",
      shoeSize:"22",
      img: "uploads/1570057655279Emma.jpg"
    },
    {
      _id: "5d952de6790c67903092f8fc",
      user: "5d94a4d181e5d7bcd020b8e7",
      name: "Alex Neal",
      birthdate: "26-04-2016",
      gender: "boy",
      clothesSize: "104",
      shoeSize:"26",
      img: "uploads/1570057702659Alex.JPG"
    }
  ]
  const {root, list, hidden, card} = useStyles();
  const [children, setChildren] = useState(childrenArr);
  const [categories, setCategories] = useState(categotiesArr);
  const [items, setItems] = useState(itemsArr);


  const [chosenChild, setChosenChild] = useState(children[0]);
  const [ { state } ] = useStateValue();

  // const token = state.user !== undefined? state.user.token: "";
  // console.log(token);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa29sYXkua2FuY2hldkB5YWhvby5jb20iLCJ1c2VySWQiOiI1ZDk4OGU0OGIxNmQ1NDM4NDg0YzA0MzIiLCJpYXQiOjE1NzA0NTA0NjgsImV4cCI6MTU3MDQ1NDA2OH0.gNpkbze2hL40qQee1Mu24njmBSSQA2ozFqykm1rTcKM";
  

  // const authorization = {
  //   headers: {'Authorization': `Bearer ${token}`}
  // };

  // if (token !== ""){
  //     axios.get("http://localhost:4000/children", authorization)
  //     .then(res => {
  //       if (res.status === 200){
  //         const children: Array<Child> = res.data.children;
  //         setChildren(children)
  //       }else{
  //         setChildren([]);
  //       }
  //   })
  //   .catch(err => {
  //     console.log("Something went wrong!");
  //   })
  // }

  const handleChangeChild = (child: Child) => {
    setChosenChild(child);
  }

  return (
    <>
        <ChildrenList children={children} handleChangeChild={handleChangeChild} chosenChild={chosenChild} />
        <div className={list}>
            {categories.map(category => {
                return (
                    <div key={category._id} className={card}>
                       <MainContent category={category} items={items} /> 
                    </div>
                ) 
            })}
            <div className={hidden}>
                <MainContent category={categories[0]} items={items}/>
            </div>
        </div>        
    </>
  );
}

export default Home;