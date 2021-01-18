import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useT } from "../hooks/translation";
import { capitalizeFirstLetter, isNull } from "../util"
import { useState } from "../hooks/state";

export interface DialogEventHandlers {
  onAgreed: () => void;
  onDiscarded: () => void;
}

export interface BaseProps extends DialogEventHandlers {
  close: () => void;
}

export interface Props extends BaseProps {
  title: string;
  children: JSX.Element;
}

export interface Hook {
  open: (onAgreed: () => void, onDiscarded: () => void) => void;
  props: BaseProps | null;
}

export function useConfirmDialog(): Hook {
  const dialog = useState<DialogEventHandlers | null>(null);

  function open(onAgreed: () => void, onDiscarded: () => void) {
    dialog.set({ onAgreed, onDiscarded });
  }

  return {
    props: isNull(dialog.value)
      ? null
      : {
        ...dialog.value,
        close: () => dialog.set(null)
      },
    open
  }
}

export function ConfirmDialog({ children, onAgreed: onAgreedBase, onDiscarded: onDiscardedBase, close, title }: Props) {
  const t = useT();
  function onAgreed() {
    onAgreedBase();
    close();
  }
  function onDiscarded() {
    onDiscardedBase();
    close();
  }
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDiscarded} color="primary">
          {capitalizeFirstLetter(t('no'))}
        </Button>
        <Button onClick={onAgreed} color="primary" autoFocus>
          {capitalizeFirstLetter(t('yes'))}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
