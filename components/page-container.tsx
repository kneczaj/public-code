import React, { forwardRef, Ref } from 'react';
import { merge } from 'public/css';

export interface Props {
  className?: string;
  contentClassName?: string;
  scrollContainerClassName?: string;
  navbar: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
  scrollWholePage?: boolean;
}

export const PageContainer = forwardRef(
  (
    {
      contentClassName,
      className,
      footer,
      main,
      navbar,
      scrollContainerClassName,
      scrollWholePage = false
    }: Props,
    ref: Ref<any>
  ) => {
    return (
      <div
        className={merge(
          className,
          'd-flex flex-column page-container-root flex-1',
          scrollWholePage && 'scroll-here'
        )}
      >
        {navbar}
        <div
          className={merge(
            scrollContainerClassName,
            'd-flex flex-1 flex-column justify-content-between',
            !scrollWholePage && 'scroll-here flex-1'
          )}
        >
          <main ref={ref} className={merge('content', contentClassName)}>
            {main}
          </main>
          {footer}
        </div>
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';
