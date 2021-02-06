import './cross.sass';

import React from 'react';
import { merge } from '../css';

export interface Props {
  className?: string;
  onClick?: () => void;
  label: string;
}

const defaultProps = {
  onClick: () => undefined
};

export function Cross(props: Props) {
  const { className, onClick, label } = props as Props & typeof defaultProps;
  return (
    <span
      aria-label={label}
      className={merge('cross-button-root', className)}
      onClick={onClick}
      aria-hidden='true'
    >
      &#x2715;
    </span>
  );
}

Cross.defaultProps = defaultProps;
