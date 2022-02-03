import React from 'react';
import { ProviderComponentProps } from 'public/components/provider-group';
import { ContextHookFactory } from 'public/utils/context-hook';

export interface LinkProps {
  className?: string;
  onClick?: () => void;
  children: string;
}

export interface ContextProps {
  contactEmail: string;
  PrivacyPolicyLink: React.ComponentType<LinkProps>;
  TermsOfServiceLink?: React.ComponentType<LinkProps>;
  companyName: string;
  nip: string;
  regon: string;
  address: string[];
  serviceName: string;
  deploymentAddress: string;
  termsOfServiceUrl: string;
}

export interface Props extends ContextProps, ProviderComponentProps {}

export const CompanyDetails =
  ContextHookFactory.createHookAndContext<ContextProps>('company details');

export function CompanyDetailsProvider({
  children,
  ...companyDetails
}: Props): JSX.Element {
  return (
    <CompanyDetails.Context.Provider value={companyDetails}>
      {children}
    </CompanyDetails.Context.Provider>
  );
}
