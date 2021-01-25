import { MeQuery } from "../../../generated/graphql";

export type User = NonNullable<MeQuery['me']>

export function getInitialState(): string | null {
  return localStorage.getItem('token') || null;
}
