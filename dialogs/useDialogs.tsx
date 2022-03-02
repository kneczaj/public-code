import {
  OpenDialogComponentProps,
  Hook as HookBase,
  OpenDialogFn as OpenDialogFnWithoutAdditionalProps
} from 'public/dialogs/useStandardDialogs';
import { useStandardDialogs } from 'public/dialogs/useStandardDialogs';

export type OpenDialogFn<TAdditionalProps> = TAdditionalProps extends void
  ? OpenDialogFnWithoutAdditionalProps
  : (
      ...args: [
        Component: (
          props: OpenDialogComponentProps & TAdditionalProps
        ) => JSX.Element,
        props: TAdditionalProps
      ]
    ) => void;

export interface Hook<TAdditionalProps = void>
  extends Omit<HookBase, 'openDialog'> {
  /**
   * Open dialog
   * @param value JSX element of the dialog
   */
  openDialog: OpenDialogFn<TAdditionalProps>;
}

export function useDialogs<TAdditionalProps = void>(): Hook<TAdditionalProps> {
  const { DialogContainer, openDialog: openDialogBase } = useStandardDialogs();
  const openDialog = (
    Component: (
      props: OpenDialogComponentProps & TAdditionalProps
    ) => JSX.Element,
    props: TAdditionalProps
  ) => {
    return openDialogBase(dialogProps => (
      <Component {...dialogProps} {...props} />
    ));
  };
  return {
    openDialog: openDialog as OpenDialogFn<TAdditionalProps>,
    DialogContainer
  };
}
