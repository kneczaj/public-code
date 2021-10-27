import { createRequestTools } from 'public/requests/request-wrapper/request-tools';
import { MeQuery, useMeQuery } from 'generated/graphql';
import { User } from 'public/auth/models/user';
import { isNull } from 'public/util';

/**
 * This requires authenticated access.
 */
export const UserRequest = createRequestTools<MeQuery, User>({
  useRequest: useMeQuery,
  extractData: response => (isNull(response.me) ? null : response.me),
  displayName: 'user'
});
