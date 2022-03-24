import * as FormContext from 'public/forms/form-name-context';
import { mockHook } from './utils';
import * as Translation from 'public/hooks/translation';
import * as UserProvider from 'public/auth/providers/auth-provider';
import { user } from './consts';
import * as UseDialog from 'public/providers/dialog-provider';

export const useT = mockHook(Translation, 'useT', (input: string) => input);
export const useFormName = mockHook(FormContext, 'useFormName', 'testform');
export const useUser = mockHook<
  typeof UserProvider.useUser,
  'useUser',
  typeof UserProvider
>(UserProvider, 'useUser', {
  user,
  isAuthenticated: true,
  logout: () => undefined,
  login: user => undefined
});

const noop = () => undefined;
const noopPromise = () => Promise.resolve();
const noopPromiseObj = () => Promise.resolve({} as any);

export const useDialog = mockHook<
  typeof UseDialog.useDialog,
  'useDialog',
  typeof UseDialog
>(UseDialog, 'useDialog', {
  openDialog: noop,
  openConfirmDialogAsync: noopPromiseObj,
  openDialogAsync: noopPromise
});
