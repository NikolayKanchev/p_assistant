import React, { useState, useEffect } from 'react';
import Table from '../Table';
import { MainContentProps } from '../../types';

import './CategoryContent.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import { fetchItems, deleteItem } from '../../utils/FetchData';


const MainContent = (props: MainContentProps) => {
  const { category, token } = props;
  const [items, setItems] = useState();

  const authorization = {
    headers: {'Authorization': `Bearer ${token}`}
  };

  useEffect(() => {
    fetchItems(category, authorization).then(itemsArr => {
      setItems(itemsArr);
    })
  }, [items]);
  
  const handleDeleteItem = (itemId: string) => {
    deleteItem(itemId, authorization);
  }

  return (
    <>
    <div>
        <Card className="card">
          <div className="category-name-cont">
              <div className="addIcon">
                <Button>
                  <AddBoxIcon />
                </Button>
              </div>
              <div className="title">{ category.name }</div>
              <Table items={items} deleteItem={handleDeleteItem}/>
          </div>
        </Card>
    </div>
    </>
  );
}

export default MainContent;