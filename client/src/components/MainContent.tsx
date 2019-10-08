import React from 'react';
import Table from './Table';
import Card from '@material-ui/core/Card';
import { Category, Item } from '../types';
import './MainContent.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Button } from '@material-ui/core';


export default function MainContent(props: { category: Category, items: Array<Item> }) {
  const { category, items } = props;

  return (
    <Card>
        <div className="category-name-cont">
            <div className="addIcon">
              <Button>
                <AddBoxIcon />
              </Button>
            </div>
            <div className="title">{ category.name }</div>
            <Table items={items}/>
        </div>
    </Card>
  );
}