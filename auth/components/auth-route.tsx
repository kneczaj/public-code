import React from 'react';
import {
  Route,
  RouteChildrenProps,
  RouteProps,
  useLocation
} from 'react-router';
import { LOGIN } from '../models/urls';
import { User } from '../models/user';
import { isNull, isReturningReactNode } from '../../util';
import { useUser } from './user-provider';
import { Redirect } from 'public/routing/components/redirect';

export interface AuthRouteChildrenProps<T> extends RouteChildrenProps<T> {
  user: User;
}

export interface Props extends Omit<RouteProps, 'children'> {
  children:
    | ((props: AuthRouteChildrenProps<any>) => React.ReactNode)
    | React.ReactNode;
}

export function AuthRoute({ children, ...props }: Props): JSX.Element {
  const { user } = useUser();
  const location = useLocation();
  if (!isNull(user)) {
    return (
      <Route {...props}>
        {isReturningReactNode<AuthRouteChildrenProps<any>>(children)
          ? (props: RouteChildrenProps<any>) => children({ ...props, user })
          : children}
      </Route>
    );
  }
  return (
    <Redirect to={{ pathname: LOGIN, state: { from: location.pathname } }} />
  );
}
