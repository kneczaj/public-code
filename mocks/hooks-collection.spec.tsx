import React from 'react';
import { render } from '@testing-library/react';
import { InnerComponent } from './hooks-collection-sandbox/innner-component';
import { useTest } from './hooks-collection-sandbox/mocks';
import * as HooksCollection from './hooks-collection-sandbox/mocks';
import { ContextError } from '../utils/context-hook';
import { mockHookCollection } from './hooks-collection';

describe('mockHook', () => {
  it('mocks TestContext', () => {
    const spy = useTest();
    const { getByText } = render(<InnerComponent />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(getByText('mockedStr')).toBeInTheDocument();
    spy.mockRestore();
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    expect(() => render(<InnerComponent />)).toThrow(ContextError);
    errorSpy.mockRestore();
  });

  it('mocks TestContext with custom value', () => {
    const spy = useTest({ str: 'alfa', setStr: val => undefined });
    const { getByText, queryByText } = render(<InnerComponent />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(getByText('alfa')).toBeInTheDocument();
    expect(queryByText('mockedStr')).not.toBeInTheDocument();
    spy.mockRestore();
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    expect(() => render(<InnerComponent />)).toThrow(ContextError);
    errorSpy.mockRestore();
  });
});

describe('mockHookCollection', () => {
  it('mocks TestContext with collection mock', () => {
    const spies = mockHookCollection(HooksCollection);
    const { getByText } = render(<InnerComponent />);
    expect(getByText('mockedStr')).toBeInTheDocument();
    expect(spies.useTest).toHaveBeenCalledTimes(1);
    spies.useTest.mockRestore();
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    expect(() => render(<InnerComponent />)).toThrow(ContextError);
    errorSpy.mockRestore();
  });

  it('collection mock lets to set custom return value', () => {
    const spies = mockHookCollection(HooksCollection, {
      useTest: defaults => ({
        ...defaults,
        str: 'alfa'
      })
    });
    const { getByText, queryByText } = render(<InnerComponent />);
    expect(getByText('alfa')).toBeInTheDocument();
    expect(queryByText('mockedStr')).not.toBeInTheDocument();
    expect(spies.useTest).toHaveBeenCalledTimes(1);
    spies.useTest.mockRestore();
    const errorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    expect(() => render(<InnerComponent />)).toThrow(ContextError);
    errorSpy.mockRestore();
  });
});
