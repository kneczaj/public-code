import './button-link.sass';
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from '../routing/components/link';

export interface Props {
  children: React.ReactNode;
  to: string;
}

export function ButtonLink({ children, to }: Props) {
  return (
    <Link className={'button-link-root'} to={to}>
      <Button color={'inherit'}>{children}</Button>
    </Link>
  );
}
