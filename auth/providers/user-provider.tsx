import { createRequestWrapper } from "public/requests/request-wrapper/create-request-wrapper";
import { MeQuery, useMeQuery } from "generated/graphql";
import { User } from "public/auth/models/user";
import { isNull } from "public/util";

/**
 * This requires authenticated access.
 */
export const [UserRequestWrapper, useUser] = createRequestWrapper<MeQuery, User>(
  useMeQuery,
  response => isNull(response.me) ? null : response.me.user,
  'user'
);
