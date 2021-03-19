import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useT } from '../hooks/translation';
import { capitalizeFirstLetter } from '../util';
import { ConfirmDialogProps } from 'public/providers/dialog-provider';

export interface Props extends ConfirmDialogProps<void> {
  title: string;
  children: JSX.Element;
}

export function ConfirmDialog({
  children,
  close,
  confirm,
  title
}: Props): JSX.Element {
  const t = useT();
  return (
    <Dialog
      open={true}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color='primary'>
          {capitalizeFirstLetter(t('no'))}
        </Button>
        <Button onClick={() => confirm()} color='primary' autoFocus>
          {capitalizeFirstLetter(t('yes'))}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
