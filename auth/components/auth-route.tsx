import React from 'react';
import { Route, RouteChildrenProps, RouteProps, useLocation } from 'react-router';
import { LOGIN } from '../models/urls';
import { User } from '../models/user';
import { isNull, isReturningReactNode } from '../../util';
import { Redirect } from 'public/routing/components/redirect';
import { useUserApi, UserRequestWrapper } from "public/auth/providers/user-provider";

export interface AuthRouteChildrenProps<T> extends RouteChildrenProps<T> {
  user: User;
}

export interface Props extends Omit<RouteProps, 'children'> {
  children:
    | ((props: AuthRouteChildrenProps<any>) => React.ReactNode)
    | React.ReactNode;
}

export function AuthRoute({children, ...props}: Props): JSX.Element {
  const {data: user} = useUserApi();
  const location = useLocation();
  if (!isNull(user)) {
    return (
      <Route {...props}>
        {isReturningReactNode<AuthRouteChildrenProps<any>>(children)
          ? (props: RouteChildrenProps<any>) => <UserRequestWrapper>{({ data, className }) => children({...props, user: data})}</UserRequestWrapper>
          : children}
      </Route>
    );
  }
  return (
    <Redirect to={{pathname: LOGIN, state: {from: location.pathname}}}/>
  );
}
