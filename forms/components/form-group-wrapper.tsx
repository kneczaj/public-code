import React from "react";
import { merge } from "../../css";
import { FieldLabel } from "./field-label";
import { Validation } from "./validation";

export interface Props {
  className?: string;
  children?: any;
}

export function FormGroupWrapper({ className, children }: Props) {
  return (
    <div className={merge('form-group', className)}>
      <FieldLabel/>
      {children}
      <Validation/>
    </div>
  );
}
