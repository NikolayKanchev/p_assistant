import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import ChildrenList from '../../components/ChildrenList';
import MainContent from '../../components/MainContent';
import { Child, Category, User } from '../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

type MyProps = {
    user: User;
}

const Home: React.FC<MyProps> = (props: MyProps) => {
    const {list, hidden, card} = useStyles();
    const { user } = props;

    const token = user !== undefined? user.token: "";
    const authorization = {
        headers: {'Authorization': `Bearer ${token}`}
    };

    const [chosenChild, setChosenChild] = useState();
    const [children, setChildren] = useState();

    useEffect(() => {        
        if (token !== ""){
           axios.get("http://localhost:4000/children", authorization)
            .then(res => {
                if (res.status === 200){
                    const childrenArr: Array<Child> = res.data.children;
                    childrenArr.map((child: Child) => {
                        return (
                            axios.post("http://localhost:4000/categories/all", { childId: child._id }, authorization)
                            .then(res => {    
                                if (res.status === 200){
                                    child.categories = res.data.categories;
                                    child.categories.map((category: Category) => {
                                        return (
                                            axios.post("http://localhost:4000/items/all", { categoryId: category._id }, authorization)
                                            .then(res => {
                                                if (res.status === 200){            
                                                    category.items = res.data.items;
                                                }
                                            })
                                        )
                                    })
                                }
                            })
                        )
                    })
                    console.log(childrenArr);
                    
                    setChildren(childrenArr);
                    setChosenChild(childrenArr[0])
                }else{
                    setChildren([]);
                }
            })
            .catch(err => {
                console.log("Something went wrong! " + err);
            }) 
        }
    }, []);

  const handleChangeChild = (child: Child) => {
    setChosenChild(child);
  }

  return (
    <>
        { chosenChild !== undefined ? (
        <>
            <ChildrenList children={children} handleChangeChild={handleChangeChild} chosenChild={chosenChild} />
            { chosenChild.categories !== undefined ? (
                <div className={list}>
                    {chosenChild.categories.map((category: Category) =>
                            <div key={category._id} className={card}>
                                <MainContent category={category} items={category.items} /> 
                            </div>
                    )}
                    <div className={hidden}>
                        <MainContent category={chosenChild.categories[0]} items={chosenChild.categories[0].items} /> 
                    </div>
                </div>
            ): null }
        </>
        ): null }    
    </>
  );
}

export default Home;