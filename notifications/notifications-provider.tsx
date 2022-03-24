import React from 'react';
import { ContextHookFactory } from '../utils/context-hook';
import {
  ProviderComponent,
  ProviderComponentProps
} from '../components/provider-group';
import { Notification } from './models/notifications';
import { useCT } from '../hooks/translation';
import { SnackbarProvider, useSnackbar } from 'notistack';

export interface ContextProps {
  show: (notification: Notification) => void;
}

export const NotificationsContext =
  ContextHookFactory.createContext<ContextProps>('notifications');

export const useNotifications =
  ContextHookFactory.createHook<ContextProps>(NotificationsContext);

const NotificationsProviderBase: ProviderComponent = ({
  children
}: ProviderComponentProps) => {
  const ct = useCT();
  const { enqueueSnackbar } = useSnackbar();
  function show({ type, message }: Notification) {
    enqueueSnackbar(ct(message), { variant: type });
  }
  return (
    <NotificationsContext.Provider
      value={{
        show
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const NotificationsProvider: ProviderComponent = ({
  children
}: ProviderComponentProps) => {
  return (
    <SnackbarProvider>
      <NotificationsProviderBase>{children}</NotificationsProviderBase>
    </SnackbarProvider>
  );
};
