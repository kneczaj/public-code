import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Centered } from 'public/components/centered';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export function LoadingIndicator() {
  const classes = useStyles();
  return (
    <Centered className={classes.root}>
      <CircularProgress />
    </Centered>
  );
}
