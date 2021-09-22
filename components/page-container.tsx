import React, { forwardRef, Ref } from 'react';
import { merge } from 'public/css';

export type ScrollElement = 'PAGE' | 'CONTENT' | 'NOTHING';

export interface Props {
  className?: string;
  contentClassName?: string;
  scrollContainerClassName?: string;
  navbar: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
  scrollElement?: ScrollElement;
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
      scrollElement = 'CONTENT'
    }: Props,
    ref: Ref<any>
  ) => {
    return (
      <div
        className={merge(
          className,
          'd-flex flex-column page-container-root flex-1',
          scrollElement === 'PAGE' && 'scroll-here'
        )}
      >
        {navbar}
        <div
          className={merge(
            scrollContainerClassName,
            'd-flex flex-1 flex-column justify-content-between',
            scrollElement === 'CONTENT' && 'scroll-here flex-1'
          )}
        >
          <main ref={ref} className={merge('content d-flex', scrollElement === 'NOTHING' && 'flex-1', contentClassName)}>
            {main}
          </main>
          {footer}
        </div>
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';
