import './centered.sass';
import React from "react";
import { merge } from "../css";

export interface Props {
  className?: string;
  children?: any;
}

export function Centered({ children, className }: Props) {
  return (
    <div className={merge('centered-root text-center', className)}>
      <div className={'inner'}>
        {children}
      </div>
    </div>
  );
}
