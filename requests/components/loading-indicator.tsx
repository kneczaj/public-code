import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Centered } from 'public/components/centered';
import { merge } from 'public/css';
import { LoadingIndicatorProps } from 'public/requests/request-wrapper/models';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export function DefaultLoadingIndicator({
  className
}: LoadingIndicatorProps): JSX.Element {
  const classes = useStyles();
  return (
    <Centered className={merge(classes.root, className)}>
      <CircularProgress />
    </Centered>
  );
}
