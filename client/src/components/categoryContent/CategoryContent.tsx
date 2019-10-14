import React from 'react';
import Table from '../Table';
import { CategoryContentProps } from '../../types';

import './CategoryContent.css';
import Card from '@material-ui/core/Card';


const CategoryContent = (props: CategoryContentProps) => {
  const { category, token } = props;

  return (
    <div>
        <Card className="card">
          <div className="category-name-cont">
              <div className="title">{ category.name }</div>
              <Table category={category} token={token}/>
          </div>
        </Card>
    </div>
  );
}

export default CategoryContent;