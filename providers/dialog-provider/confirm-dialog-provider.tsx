import React, { useCallback } from 'react';
import { ProviderComponentProps } from 'public/components/provider-group';
import { createHookContext } from 'public/utils/context-hook';
import {
  DialogProps,
  Dialog
} from 'public/providers/dialog-provider/dialog-provider';

export interface ConfirmDialogProps<TReturnValue> extends DialogProps {
  confirm: (data: TReturnValue) => void;
}

export type ConfirmDialogComponent<TReturnValue> = React.ComponentType<
  ConfirmDialogProps<TReturnValue>
>;

export interface Hook {
  /**
   * Open dialog
   */
  openDialog<TReturnValue>(
    Component: ConfirmDialogComponent<TReturnValue>,
    callbacks?: {
      onConfirm?: (data: TReturnValue) => void;
      onClose?: () => void;
    }
  ): void;
}

export const ConfirmDialog = createHookContext<Hook>('confirm dialog');

export const ConfirmDialogProvider = ({
  children
}: ProviderComponentProps): JSX.Element => {
  const { openDialog: openDialogBase } = Dialog.useContext();
  const openDialog = useCallback(
    (
      Component: ConfirmDialogComponent<unknown>,
      callbacks?: {
        onConfirm?: (data: unknown) => void;
        onClose?: () => void;
      }
    ) =>
      openDialogBase(
        ({ close, id }) => (
          <Component
            id={id}
            close={close}
            confirm={(data: unknown) => {
              callbacks && callbacks.onConfirm && callbacks.onConfirm(data);
              close();
            }}
          />
        ),
        (callbacks && callbacks.onClose) || undefined
      ),
    [openDialogBase]
  );

  return (
    <ConfirmDialog.Context.Provider
      value={{ openDialog: openDialog as Hook['openDialog'] }}
    >
      {children}
    </ConfirmDialog.Context.Provider>
  );
};

export interface AsyncHook {
  /**
   * Open dialog
   */
  openDialog<TReturnValue>(
    Component: ConfirmDialogComponent<TReturnValue>
  ): Promise<TReturnValue>;
}

/**
 * Allows to fire the dialog asynchronously. Resolves the promise on confirm, and rejects on cancel/close.
 *
 * NOTE: please use the hook from index.ts instead
 */
export function useConfirmDialogAsync(): AsyncHook {
  const { openDialog: openDialogBase } = ConfirmDialog.useContext();
  return {
    openDialog<TReturnValue>(
      Component: ConfirmDialogComponent<TReturnValue>
    ): Promise<TReturnValue> {
      return new Promise<TReturnValue>((resolve, reject) => {
        openDialogBase(Component, { onClose: reject, onConfirm: resolve });
      });
    }
  };
}
