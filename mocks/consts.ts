import { User } from "../auth/models/user";
import { ApolloClient } from "@apollo/client/core";

export const apolloClient = {} as ApolloClient<object>;

export const user: User = {
  username: "user",
  email: "testuser@testdomain.com",
  id: "1",
  blocked: false,
  confirmed: true,
  role: {
    name: "Authenticated"
  }
}
