import { mockHook } from './utils';
import * as FormContext from 'public/forms/form-name-context';
import * as Translation from 'public/hooks/translation';
import * as AuthProvider from 'public/auth/providers/auth-provider';
import { user } from './consts';
import * as UseDialog from 'public/dialogs/dialog-provider';

export const useT = mockHook(Translation, 'useT', (input: string) => input);
export const useFormName = mockHook(FormContext, 'useFormName', 'testform');

export const useAuth = mockHook<
  typeof AuthProvider.useAuth,
  'useAuth',
  typeof AuthProvider
>(AuthProvider, 'useAuth', {
  user,
  isAuthenticated: true,
  logout: () => undefined,
  login: user => undefined
});

const noop = () => undefined;
const noopPromise = () => Promise.resolve();
const noopPromiseObj = () => Promise.resolve({} as any);

export const useGlobalDialog = mockHook<
  typeof UseDialog.useGlobalDialog,
  'useGlobalDialog',
  typeof UseDialog
>(UseDialog, 'useGlobalDialog', {
  openDialog: noop,
  openConfirmDialogAsync: noopPromiseObj,
  openDialogAsync: noopPromise
});
