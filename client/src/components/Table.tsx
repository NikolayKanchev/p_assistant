import React, { useState, useEffect } from 'react';
import { Item, Category } from '../types';
import Dialog from './ItemDialog';
import { fetchItems, deleteItem } from '../utils/FetchData';

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';


const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    img: {
      width: 40,
      height: 40,
      borderRadius: 5
    },
    head: {
      backgroundColor: "#e4e1fc",
    },
    actions: {
      display: "flex",
      marginTop: "8.5px",
      position: "absolute"
    }
  }),
);

type TableProps = {
  category: Category;
  token: string;
}

export default function CustomPaginationActionsTable(props: TableProps) {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { category, token } = props;
  const [items, setItems] = useState();

  const fetchData = () => {
    fetchItems(category, token).then(itemsArr => {
      setItems(itemsArr);
    });
  }

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed){
      fetchItems(category, token).then(itemsArr => {
        setItems(itemsArr);
      });
    }
    return () => { isSubscribed = false; }
  }, [category, token, setItems]);

  const length = items !== undefined ? items.length : 0;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, length - page * rowsPerPage);
  

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItem = (itemId: string) => {
    deleteItem(itemId, token).then(() => {
      fetchData();
    });
  }

  const reloadData = () => {
    fetchData();
  }

  return (
    <>
    <div className="addIcon">
      <Dialog type="add" categoryId={category._id} token={token} reload={reloadData}/>
    </div>
    <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow className={classes.head}>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Image</TableCell>
              </TableRow>
              { items !== undefined ? (<>
              {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: Item) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                    {item.name}
                    </TableCell>
                    <TableCell align="center" className={classes.actions}>
                        <Button onClick={() => handleDeleteItem(item._id)}><DeleteIcon/></Button>
                        <Dialog type="update" categoryId={item.category} token={token} item={item} reload={reloadData}/>
                    </TableCell>
                    <TableCell align="right">{item.size}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right"><img className={classes.img} src={"http://localhost:4000/" + item.img} alt=""/></TableCell>
                  </TableRow>
              ))}
              </>): null }
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={items !== undefined ? items.length: 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
    </Paper>
    </>
  );
}