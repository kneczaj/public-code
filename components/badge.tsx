import React from "react";
import { merge } from "../css";
import { isUndefined } from "../util";
import "./badge.sass";
import { Cross } from "./cross";
import { useT } from "../hooks/translation";

export interface Props {
  prefix?: React.ReactNode;
  className?: string;
  children: any;
  onCrossClick?: () => void;
  onClick?: () => void;
}

export function Badge({
  className,
  onClick,
  onCrossClick,
  children,
  prefix
}: Props): JSX.Element {
  const t = useT();
  if (!children) {
    return <></>;
  }
  return (
      <span style={{ padding: 0 }} className={merge('badge badge-root badge-secondary', className)} onClick={onClick}>
        {prefix || null}
        <span
          className={merge('inner', onClick && 'clickable', !isUndefined(onCrossClick) && 'with-cross')}
        >{children}</span>
        {!isUndefined(onCrossClick) &&
          <Cross label={t('remove')} className={'inner clickable'} onClick={onCrossClick}/>
        }
      </span>
  )
}
