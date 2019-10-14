import React, { useState, useEffect } from 'react';
import ChildrenList from '../../components/ChildrenList';
import Button from '../../components/Button';
import CategoryContent from '../../components/categoryContent/CategoryContent';
import { Child, Category, User } from '../../types'
import { fetchChildren, fetchCategories } from '../../utils/FetchData';
import AddButton from '../../components/Button';

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    hidden: {
        visibility: "hidden",
        width: "655px",
    },
    addCategoryBtn: {
        marginTop: 30
    },
    addBtn: {
        position: "absolute",
        marginTop: "35px",
        marginLeft: "40%"
    },
  }),
);

type MyProps = {
    user: User;
}

const Home: React.FC<MyProps> = (props: MyProps) => {
    const {list, hidden, addCategoryBtn, addBtn} = useStyles();
    const { user } = props;

    const token = user !== undefined? user.token: "";

    const [chosenChild, setChosenChild] = useState();
    const [children, setChildren] = useState();
    const [categories, setCategories] = useState();

    const fetchData = () => {
        fetchChildren(token).then(childrenArr => {
            setChosenChild(childrenArr[0]);
            setChildren(childrenArr);

            if (childrenArr.length > 0){
                fetchCategories(childrenArr[0], token).then(category => {
                    setCategories(category);
                }); 
            }
        });
    }

    useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
            fetchData();
        }
        return () => { isSubscribed = false };
    }, [token]);    

  const handleChangeChild = (child: Child) => {
    setChosenChild(child);
    fetchCategories(child, token).then(category => {
        setCategories(category);
    });
  }

  return (
    <>
        { chosenChild !== undefined ? (
        <>
            <ChildrenList children={children} handleChangeChild={handleChangeChild} chosenChild={chosenChild} token={token} reloadhildren={() => fetchData()} />
            <div className={addCategoryBtn}>
                <Button color="secondary" variant="outlined" text="Add New Category" />
            </div>

            { categories !== undefined ? (
                <div className={list}>
                    {categories.map((category: Category) =>
                        <CategoryContent key={category._id} category={category} token={token}/>
                    )}
                    <div className={hidden}></div>
                </div>
            ): null }
        </>
        ):
        <div className={addBtn}>
            <AddButton color="secondary" variant="outlined" text="Add Child" />
        </div>
        }    
    </>
  );
}

export default Home;