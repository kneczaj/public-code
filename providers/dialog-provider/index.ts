import React from 'react';
import {
  ConfirmDialogComponent,
  ConfirmDialogProvider
} from 'public/providers/dialog-provider/confirm-dialog-provider';
import { DialogComponent } from 'public/providers/dialog-provider/dialog-provider';
import { useDialog as useDialogBase, useDialogAsync } from './dialog-provider';
import {
  useConfirmDialog,
  useConfirmDialogAsync
} from './confirm-dialog-provider';
import { useCallback } from 'react';

import { DialogProvider as DialogProviderBase } from './dialog-provider';
import { ProviderComponentProps } from 'public/components/provider-group';
export type { ConfirmDialogProps } from './confirm-dialog-provider';
export type { DialogProps as SimpleDialogProps } from './dialog-provider';

export interface Hook {
  /**
   * Universal open dialog function. It may handle both simple dialogs which just open/close and confirm dialogs which
   * has also "Confirm" button to receive data from the user
   */
  openDialog<TReturnValue>(
    Component: DialogComponent | ConfirmDialogComponent<TReturnValue>,
    callbacks?: {
      onClose?: () => void;
      onConfirm?: (data: TReturnValue) => void;
    }
  ): void;

  /**
   * Open dialog with promise which resolves on close prop triggered
   */
  openDialogAsync(Component: DialogComponent): Promise<void>;

  /**
   * Open dialog with promise which rejects on close prop triggered and resolves on confirm prop triggered
   */
  openConfirmDialogAsync<TReturnValue>(
    Component: ConfirmDialogComponent<TReturnValue>
  ): Promise<TReturnValue>;
}

export function useDialog(): Hook {
  const { openDialog: openSimpleDialog } = useDialogBase();
  const { openDialog: openDialogAsync } = useDialogAsync();
  const { openDialog: openConfirmDialog } = useConfirmDialog();
  const { openDialog: openConfirmDialogAsync } = useConfirmDialogAsync();

  /**
   * Renders as a confirm dialog when onConfirm callback is passed
   */
  const openDialog = useCallback(
    <TReturnValue>(
      Component: TReturnValue extends void
        ? DialogComponent
        : ConfirmDialogComponent<TReturnValue>,
      callbacks?: {
        onClose?: () => void;
        onConfirm?: (data: TReturnValue) => void;
      }
    ): void => {
      if (callbacks && callbacks.onConfirm) {
        openConfirmDialog(
          Component as ConfirmDialogComponent<TReturnValue>,
          callbacks
        );
        return;
      }
      openSimpleDialog(
        Component as DialogComponent,
        callbacks ? callbacks.onClose : undefined
      );
      return;
    },
    [openConfirmDialog, openSimpleDialog]
  );

  return {
    openDialog,
    openDialogAsync,
    openConfirmDialogAsync
  };
}

export function DialogProvider({
  children
}: ProviderComponentProps): JSX.Element {
  return React.createElement(
    DialogProviderBase,
    null,
    React.createElement(ConfirmDialogProvider, null, children)
  );
}
