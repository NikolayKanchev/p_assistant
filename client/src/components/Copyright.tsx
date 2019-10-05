import React from 'react';

import Typography from '@material-ui/core/Typography';
import MatLink from '@material-ui/core/Link';


const Copyright = () =>{
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MatLink color="inherit" href="https://material-ui.com/">
        Parents' Assistant
      </MatLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;