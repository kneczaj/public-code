import React, { ErrorInfo } from "react";
import { ProviderComponentProps } from "public/components/provider-group";
import { Redirect } from "react-router-dom";
import { LOGIN } from "public/auth/models/urls";
import { getLocationObj } from "public/routing/models";
import { AuthenticationError } from "public/requests/models/errors";

export interface State {
  hasError: boolean;
}

export class AuthErrorBoundary extends React.Component<ProviderComponentProps, State> {

  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    if (error instanceof AuthenticationError) {
      return { hasError: true };
    }
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Redirect
          to={getLocationObj(LOGIN, {}, currentSearch => ({ from: window.location.href }))}
        />
      );
    }

    return this.props.children;
  }
}
