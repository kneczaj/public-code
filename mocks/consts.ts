import { User } from "../auth/models/user";
import { ApolloClient } from "@apollo/client/core";

export const apolloClient = {} as ApolloClient<object>;

export const user: User = {
  token: "token",
  email: "testuser@testdomain.com"
}
