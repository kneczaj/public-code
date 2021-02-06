// @ts-ignore
import { NotificationManager as NotificationManagerBase } from 'react-notifications';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type NotifyFunction = (
  message: string,
  title?: string,
  timeout?: number,
  callback?: () => void
) => void;

export interface NotificationManager {
  info: NotifyFunction;
  success: NotifyFunction;
  warning: NotifyFunction;
  error: NotifyFunction;
}

export const NotificationManager = NotificationManagerBase as NotificationManager;

export interface Notification {
  type: NotificationType;
  message: string;
  title?: string;
}
