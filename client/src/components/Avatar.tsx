import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  bigAvatar: {
    marginLeft: "25%",
    width: 60,
    height: 60,
  },
  main: {
      paddingTop: 10,
      minHeight: "122px",
      display: "block",
      width: "120px"
  }
});

type ImgProps = {
    img: string,
    name: string
}

const ImageAvatars: React.FC<ImgProps> = (props: ImgProps) => {
  const classes = useStyles();
  const { img, name } = props;

  const path = "http://localhost:4000/" + img;

  return (
    <Grid className={classes.main} container justify="center" alignItems="center">
      <Avatar alt={name} src={path} className={classes.bigAvatar} />
      <div>{name}</div>
    </Grid>
  );
}

export default ImageAvatars;