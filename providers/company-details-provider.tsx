import React from 'react';
import { ProviderComponentProps } from 'public/components/provider-group';
import { createContext, createContextHook } from 'public/utils/context-hook';

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
}

export interface Props extends ContextProps, ProviderComponentProps {}

export const CompanyDetailsContext = createContext<ContextProps>(
  'company details'
);
export const useCompanyDetails = createContextHook<ContextProps>(
  CompanyDetailsContext
);

export function CompanyDetailsProvider({
  children,
  ...companyDetails
}: Props): JSX.Element {
  return (
    <CompanyDetailsContext.Provider value={companyDetails}>
      {children}
    </CompanyDetailsContext.Provider>
  );
}
