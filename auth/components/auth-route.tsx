import React from 'react';
import {
  Route,
  RouteChildrenProps,
  RouteProps,
  useLocation
} from 'react-router';
import { LOGIN } from '../models/urls';
import { User } from '../models/user';
import { maybePassProps } from '../../util';
import { Redirect } from 'public/routing/components/redirect';
import { useAuth } from 'public/auth/providers/auth-provider';
import { UserRequest } from 'public/auth/providers/user-provider';
import { getLocationObj } from 'public/routing/models';

export interface AuthRouteChildrenProps<T> extends RouteChildrenProps<T> {
  className?: string;
  user: User;
}

export interface Props extends Omit<RouteProps, 'children'> {
  contentClassName?: string;
  className?: string;
  children:
    | ((props: AuthRouteChildrenProps<any>) => React.ReactNode)
    | React.ReactNode;
}

export function AuthRoute({
  children,
  contentClassName,
  className,
  ...props
}: Props): JSX.Element {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) {
    return (
      <Route {...props}>
        {(props: RouteChildrenProps<any>) => (
          <UserRequest.WrapperWithProvider
            className={className}
            contentClassName={contentClassName}
          >
            {({ data, className }) =>
              maybePassProps<AuthRouteChildrenProps<any>>(children, {
                ...props,
                className,
                user: data
              })
            }
          </UserRequest.WrapperWithProvider>
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
