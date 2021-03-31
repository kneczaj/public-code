import { ProviderComponentProps } from 'public/components/provider-group';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

export const Router = (props: ProviderComponentProps): JSX.Element => (
  <BrowserRouter {...props} />
);
