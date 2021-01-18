import { isUndefined } from "../../util";
import { TokenResponsePayload } from "./token";

interface RegisterToConfirmResponsePayload {
  /**
   * Info message in English
   */
  detail: string;
}

export type RegisterResponsePayload = TokenResponsePayload | RegisterToConfirmResponsePayload;

export function isRegisterResponseToConfirm(payload: RegisterResponsePayload): payload is RegisterToConfirmResponsePayload {
  return isUndefined((payload as TokenResponsePayload).key);
}

export interface RegisterQueryPayload {
  email: string;
  password1: string;
  password2: string;
}
