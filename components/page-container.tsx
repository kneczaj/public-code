import React, { Ref } from 'react';
import { merge } from 'public/css';

export type ScrollElement = 'PAGE' | 'CONTENT' | 'NOTHING';

export interface Props {
  className?: string;
  contentClassName?: string;
  scrollContainerClassName?: string;
  navbar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  scrollElement?: ScrollElement;
  contentScrollContainerRef?: Ref<any>;
}

export function PageContainer({
  contentScrollContainerRef,
  contentClassName,
  className,
  footer,
  children,
  navbar,
  scrollContainerClassName,
  scrollElement = 'CONTENT'
}: Props) {
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
        ref={contentScrollContainerRef}
      >
        <main
          className={merge(
            'content d-flex flex-column',
            scrollElement === 'NOTHING' && 'flex-1',
            contentClassName
          )}
        >
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}
