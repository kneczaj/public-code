import React from 'react';
import { Route, Switch } from "react-router";
import { FACEBOOK_CALLBACK, GOOGLE_CALLBACK } from "./models/urls";
import { NotFound } from "../pages/not-found";
import { LoginRedirect } from "./components/login-redirect";

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
      <NotFound />
    </Switch>
  );
}
