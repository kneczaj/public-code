import { createRequestTools } from 'public/requests/request-wrapper/request-tools';
import { useMeQuery as useMeQueryBase } from 'generated/graphql';
import { User } from 'public/auth/models/user';
import { isNull } from 'public/util';
import { extractData } from 'public/graphql/tools';

const useMeQuery = extractData(useMeQueryBase, response =>
  isNull(response.me) ? null : response.me
);

/**
 * This requires authenticated access.
 */
export const UserRequest = createRequestTools<User>({
  useRequest: useMeQuery,
  displayName: 'user'
});
