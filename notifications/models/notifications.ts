import { VariantType } from 'notistack';

export interface Notification {
  type: VariantType;
  message: string;
  title?: string;
}
