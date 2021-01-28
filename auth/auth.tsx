import React from 'react';
import { Route, Switch } from "react-router";
import { FACEBOOK_CALLBACK, GOOGLE_CALLBACK, LOGIN } from "./models/urls";
import { NotFound } from "../pages/not-found";
import { LoginRedirect } from "./components/login-redirect";
import { Login } from "branded/auth/pages/login";

export interface Props {}

export function Auth(props: Props) {
  return (
    <Switch>
      <Route exact path={GOOGLE_CALLBACK}>
        <LoginRedirect providerName={'google'}/>
      </Route>
      <Route exact path={FACEBOOK_CALLBACK}>
        <LoginRedirect providerName={'facebook'}/>
      </Route>
      <Route path={LOGIN}>
        <Login/>
      </Route>
      <NotFound />
    </Switch>
  );
}
