import React from 'react';
import { merge } from 'public/css';
import { Hidden } from '@material-ui/core';

export interface LogoDimensions {
  height: number;
  heightRatio: number;
}

export const BIG = {
  height: 50,
  heightRatio: 0.88
};

export interface Props {
  wrap?: boolean;
  className?: string;
  height: number;
  heightRatio: number;
  LabelSVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  LogoSVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export function Logo({
  className,
  height,
  heightRatio,
  wrap = false,
  LabelSVG,
  LogoSVG
}: Props) {
  return (
    <div
      className={merge(
        'logo-root d-flex align-items-center',
        wrap && 'flex-wrap',
        className
      )}
    >
      <LogoSVG
        height={height}
        style={{ marginRight: 0.25 * height * heightRatio }}
      />
      <Hidden xsDown implementation='css'>
        <LabelSVG
          height={height * heightRatio}
          style={{ marginTop: (-height * heightRatio) / 12 }}
        />
      </Hidden>
    </div>
  );
}
