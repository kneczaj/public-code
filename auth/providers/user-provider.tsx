import { createRequestWrapper } from 'public/requests/request-wrapper/create-request-wrapper';
import { MeQuery, useMeQuery } from 'generated/graphql';
import { User } from 'public/auth/models/user';
import { isNull } from 'public/util';
import { createContext, createContextHook } from 'public/utils/context-hook';

const UserContext = createContext<User>('user');
export const useUser = createContextHook<User>(UserContext);
/**
 * This requires authenticated access.
 */
export const UserRequestWrapper = createRequestWrapper<MeQuery, User>(
  useMeQuery,
  response => (isNull(response.me) ? null : response.me),
  'user',
  UserContext
);
