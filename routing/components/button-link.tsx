import React, { forwardRef, MutableRefObject } from 'react';
import { Link as ReactLink, LinkProps } from 'react-router-dom';
import { getLocationObj, LocationDescriptor, UpdateSearch } from '../models';
import { useHistory } from '../hooks/history';
import { StringifiableRecord } from 'query-string';
import { Button, ButtonProps } from '@material-ui/core';
import { Link } from 'public/routing/components/link';

export type PropsBase<S> = LinkProps<S> &
  React.RefAttributes<HTMLAnchorElement>;

export interface Props<LocationState, Search> extends ButtonProps<ReactLink> {
  to: LocationDescriptor<LocationState>;
  updateSearch?: UpdateSearch<Search>;
}

export function ButtonLinkWithoutRef<
  LocationState,
  Search extends StringifiableRecord
>(
  { to, updateSearch, ...rest }: Props<LocationState, Search>,
  ref?:
    | ((instance: HTMLAnchorElement | null) => void)
    | MutableRefObject<HTMLAnchorElement | null>
    | null
): JSX.Element {
  const { location } = useHistory<LocationState, Search>();
  return (
    <Button
      ref={ref}
      underline={'none'}
      component={Link}
      to={getLocationObj<LocationState, Search>(
        to,
        location.search,
        updateSearch
      )}
      {...rest}
    />
  );
}

export const ButtonLink = forwardRef<HTMLAnchorElement, Props<any, any>>(
  ButtonLinkWithoutRef
);
