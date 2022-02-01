import React from 'react';
import { useHistory } from 'react-router';
import { merge } from '../../css';
import { Button } from '@material-ui/core';
import { Centered } from '../../components/centered';
import { ErrorPlaceholderProps } from 'public/requests/request-wrapper/models';

/**
 * Show error to the user, occupies minimum place in height
 */
export function DefaultErrorPlaceholder({
  children,
  value: { messages },
  showGoBack,
  className,
  retry
}: ErrorPlaceholderProps): JSX.Element {
  const history = useHistory();
  return (
    <div
      className={merge(
        className,
        'error-root centered-container text-center flex-1 d-flex flex-column'
      )}
    >
      <Centered>
        {messages.map((message, idx) => (
          <h1 key={idx}>{message}</h1>
        ))}
        {(retry || showGoBack) && (
          <div style={{ marginTop: '1em' }}>
            {showGoBack && <Button onClick={history.goBack}>Go back</Button>}
            {retry && <Button onClick={retry}>Retry</Button>}
          </div>
        )}
        {children}
      </Centered>
    </div>
  );
}
