import { isNull } from "../../util";

export interface User {
  email: string;
  token: string;
}

export function getInitialState(): User | null {
  const email = localStorage.getItem('username') || null;
  const token = localStorage.getItem('token') || null;
  if (isNull(email) || isNull(token)) {
    return null;
  }
  return {
    email,
    token
  };
}
