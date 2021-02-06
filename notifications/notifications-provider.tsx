import React from 'react';
import { createContext, createContextHook } from '../utils/context-hook';
import {
  ProviderComponent,
  ProviderComponentProps
} from '../components/provider-group';
import {
  Notification,
  NotificationManager,
  NotifyFunction
} from './models/notifications';
import { capitalizeFirstLetter } from '../util';
import { useT } from '../hooks/translation';

export interface ContextProps {
  show: (notification: Notification) => void;
}

export const NotificationsContext = createContext<ContextProps>(
  'notifications'
);
export const useNotifications = createContextHook(NotificationsContext);

export const NotificationsProvider: ProviderComponent = ({
  children
}: ProviderComponentProps) => {
  const t = useT();
  function show(notification: Notification) {
    const notifyFn: NotifyFunction = NotificationManager[
      notification.type
    ].bind(NotificationManager);
    const title = notification.title
      ? capitalizeFirstLetter(t(notification.title))
      : undefined;
    notifyFn(t(notification.message), title);
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
