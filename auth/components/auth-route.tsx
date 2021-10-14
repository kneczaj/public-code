import React from 'react';
import {
  Route,
  RouteChildrenProps,
  RouteProps,
  useLocation
} from 'react-router';
import { LOGIN } from '../models/urls';
import { User } from '../models/user';
import { isReturningReactNode } from '../../util';
import { Redirect } from 'public/routing/components/redirect';
import { useAuth } from 'public/auth/providers/auth-provider';
import { UserRequestWrapper } from 'public/auth/providers/user-provider';
import { getLocationObj } from 'public/routing/models';

export interface AuthRouteChildrenProps<T> extends RouteChildrenProps<T> {
  user: User;
}

export interface Props extends Omit<RouteProps, 'children'> {
  children:
    | ((props: AuthRouteChildrenProps<any>) => React.ReactNode)
    | React.ReactNode;
}

export function AuthRoute({ children, ...props }: Props): JSX.Element {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) {
    return (
      <Route {...props}>
        {(props: RouteChildrenProps<any>) => (
          <UserRequestWrapper>
            {({ data, className }) =>
              isReturningReactNode<AuthRouteChildrenProps<any>>(children)
                ? children({
                    ...props,
                    user: data
                  })
                : children
            }
          </UserRequestWrapper>
        )}
      </Route>
    );
  }
  return (
    <Route {...props}>
      <Redirect
        to={getLocationObj(LOGIN, {}, currentSearch => ({
          from: location.pathname
        }))}
      />
    </Route>
  );
}
