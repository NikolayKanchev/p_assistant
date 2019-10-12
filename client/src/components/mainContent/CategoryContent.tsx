import React, { useState, useEffect } from 'react';
import Table from '../Table';
import Dialog from '../ItemDialog';
import { MainContentProps } from '../../types';

import './CategoryContent.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import { fetchItems, deleteItem } from '../../utils/FetchData';


const MainContent = (props: MainContentProps) => {
  const { category, token } = props;
  const [items, setItems] = useState();
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleAddItemDialog = () => {
    if (openDialog){
      setOpenDialog(false);
    }else{
      setOpenDialog(true);
    }
  }

  return (
    <div>
        { openDialog ? 
          <Dialog closeDialog={handleAddItemDialog} category={category} authorization={authorization}/>
        : null }
        <Card className="card">
          <div className="category-name-cont">
              <div className="addIcon">
                <Button onClick={handleAddItemDialog}>
                  <AddBoxIcon />
                </Button>
              </div>
              <div className="title">{ category.name }</div>
              <Table items={items} deleteItem={handleDeleteItem}/>
          </div>
        </Card>
    </div>
  );
}

export default MainContent;