import React from 'react';
import './inline-container.sass';
import { merge } from '../css';

export interface Props {
  children: any;
  className?: string;
}

export function InlineContainer({ children, className }: Props) {
  return (
    <div className={merge('inline-container-root', className)}>
      <div className={'compensation-container'}>{children}</div>
    </div>
  );
}
