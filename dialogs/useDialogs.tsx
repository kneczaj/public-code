import {
  DialogProps as DialogPropsBase,
  Hook as HookBase,
  useStandardDialogs
} from 'public/dialogs/useStandardDialogs';
import { ComponentType } from 'react';

/**
 * Dialog props with additional props
 */
export type DialogProps<TAdditionalProps = void> = DialogPropsBase &
  Omit<TAdditionalProps, keyof DialogPropsBase>;
/**
 * Additional props over DialogProps
 */
export type AdditionalProps<TProps> = Omit<TProps, keyof DialogPropsBase>;
/**
 * DialogComponent with possible additional props over DialogProps
 */
export type DialogComponent<TProps = void> = ComponentType<DialogProps<TProps>>;

export interface Hook extends Omit<HookBase, 'openDialog'> {
  /**
   * Open dialog
   */
  openDialog<TAdditionalProps>(
    Component: DialogComponent<TAdditionalProps>,
    props: AdditionalProps<TAdditionalProps>
  ): void;
  openDialog(Component: DialogComponent): void;
}

/**
 * Allows to pass additional props to opened dialog
 */
export function useDialogs(): Hook {
  const { DialogContainer, openDialog: openDialogBase } = useStandardDialogs();
  return {
    openDialog<TAdditionalProps>(
      Component: DialogComponent<TAdditionalProps>,
      props?: AdditionalProps<TAdditionalProps>
    ) {
      if (props) {
        return openDialogBase((dialogProps: DialogPropsBase) => (
          <Component {...props} {...dialogProps} />
        ));
      }
      return openDialogBase(Component as DialogComponent);
    },
    DialogContainer
  };
}
