import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ChildrenList from '../../components/ChildrenList';
import MainContent from '../../components/mainContent/CategoryContent';
import { Child, Category, User } from '../../types'
import { fetchChildren, fetchCategories } from '../../utils/FetchData';

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: "20px",
    },
    hidden: {
        visibility: "hidden",
    }
  }),
);

type MyProps = {
    user: User;
}

const Home: React.FC<MyProps> = (props: MyProps) => {
    const {list, hidden} = useStyles();
    const { user } = props;

    const token = user !== undefined? user.token: "";
    
    const authorization = {
        headers: {'Authorization': `Bearer ${token}`}
    };

    const [chosenChild, setChosenChild] = useState();
    const [children, setChildren] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        fetchChildren(authorization).then(childrenArr => {
            setChosenChild(childrenArr[0]);
            setChildren(childrenArr);

            fetchCategories(childrenArr[0], authorization).then(category => {
                setCategories(category);
            });
        });
    }, []);

    console.log(chosenChild);
    

  const handleChangeChild = (child: Child) => {
    setChosenChild(child);
    fetchCategories(child, authorization).then(category => {
        setCategories(category);
    });
  }

  return (
    <>
        { chosenChild !== undefined ? (
        <>
            <ChildrenList children={children} handleChangeChild={handleChangeChild} chosenChild={chosenChild} />

            { categories !== undefined ? (
                <div className={list}>
                    {categories.map((category: Category) =>
                        <MainContent key={category._id} category={category} token={token}/> 
                    )}
                    <div className={hidden}>
                        <MainContent category={categories[0]}  token={token}/> 
                    </div>
                </div>
            ): null }

        </>
        ): null }    
    </>
  );
}

export default Home;