import React from "react";
import { Link as LinkBase, LinkProps } from "react-router-dom";
import { getLocationObj, LocationDescriptor, UpdateSearch } from "../models";
import { useHistory } from "../hooks/history";
import { StringifiableRecord } from "query-string";

export type PropsBase<S> = LinkProps<S> & React.RefAttributes<HTMLAnchorElement>;

export interface Props<LocationState, Search> extends Omit<PropsBase<LocationState>, 'to'> {
  to: LocationDescriptor<LocationState>;
  updateSearch?: UpdateSearch<Search>;
}

export function Link<LocationState, Search extends StringifiableRecord>({
  to,
  updateSearch,
  ...rest
}: Props<LocationState, Search>) {
  const { location } = useHistory<LocationState, Search>();
  return <LinkBase to={getLocationObj<LocationState, Search>(to, location.search, updateSearch)} {...rest}/>;
}
