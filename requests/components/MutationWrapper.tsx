import React, { ComponentType, ReactNode } from 'react';
import { LoadingIndicatorProps } from 'public/requests/request-wrapper/models';
import { useCT } from 'public/hooks/translation';
import { merge } from 'public/css';
import { makeStyles } from '@material-ui/core';
import { MutationsContext } from 'public/graphql/models';
import { DefaultLoadingIndicator } from 'public/requests/components/loading-indicator';

export interface Props<TMutationLabels extends string | never = never>
  extends MutationsContext<TMutationLabels> {
  /**
   * Passed to each: children, noDataPlaceholder, errorPlaceholder
   */
  className?: string;
  LoadingIndicator?: ComponentType<LoadingIndicatorProps>;
  /**
   * The proper component
   */
  children: ReactNode;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  mutatingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
}));

export function MutationWrapper<
  TData,
  TMutationLabels extends string | never = never,
  TNoData = null
>({
  children,
  className,
  mutating,
  LoadingIndicator = DefaultLoadingIndicator
}: Props<any>): JSX.Element {
  const classes = useStyles();
  const ct = useCT();
  return (
    <div className={merge(className, classes.root)}>
      {mutating && (
        <LoadingIndicator
          className={classes.mutatingIndicator}
          label={
            typeof mutating === 'string' ? `${ct(mutating)}...` : undefined
          }
        />
      )}
      {children}
    </div>
  );
}
