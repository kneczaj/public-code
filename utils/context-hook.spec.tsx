import { ContextHookFactory } from 'public/utils/context-hook';
import { MOCKS } from 'public/test';
import { render, RenderResult, screen } from '@testing-library/react';
import { Component } from 'react';

describe('ContextHookFactory', () => {
  let rendered: RenderResult;

  const getElement = {
    error: () => screen.getByTestId('error'),
    contextValue: () => screen.getByTestId('contextValue')
  };

  const spies = {
    useTest: jest.spyOn(MOCKS, 'useTest')
  };

  const useTest = MOCKS.useTest;
  const TestContext = MOCKS.TestContext;

  function HookComponent() {
    const contextValue = useTest();
    return <div data-testid={'contextValue'}>{contextValue}</div>;
  }

  interface State {
    errorMsg: string | undefined;
  }

  class ErrorBoundary extends Component<{}, State> {
    constructor(props) {
      super(props);
      this.state = { errorMsg: undefined };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { errorMsg: error.message };
    }

    render() {
      if (this.state.errorMsg) {
        // You can render any custom fallback UI
        return <div data-testid={'message'}>{this.state.errorMsg}</div>;
      }

      return this.props.children;
    }
  }

  describe('createContext', () => {
    it('creates context with display name', () => {
      expect(TestContext.displayName).toBe('TestContext');
    });
  });

  describe('createHook', () => {
    describe('inside context', () => {
      beforeEach(() => {
        rendered = render(
          <TestContext.Provider value={'success'}>
            <HookComponent />
          </TestContext.Provider>
        );
      });
      it('returns the context value', () => {
        expect(getElement.contextValue()).toBeInTheDocument();
        expect(screen.getByText('success')).toBeInTheDocument();
      });
    });
    describe('outside context', () => {
      beforeEach(() => {
        rendered = render(
          <ErrorBoundary>
            <HookComponent />
          </ErrorBoundary>
        );
      });
      it('throws error', () => {
        expect(getElement.error()).toBeInTheDocument();
        expect(getElement.error()).toHaveTextContent(
          'A context hook for context called "TestContext" is used outside the context provider'
        );
      });
    });
  });
});
