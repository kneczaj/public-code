import { Form } from 'react-final-form';
import React from 'react';
import { CheckboxArray, getInitialValues, Props } from './checkbox-array';
import { mockAllProviderHooks } from '../../mocks';
import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen
} from '@testing-library/react';

const mocks = {
  onSubmit: (values: any) => {}
};

function TestComponent(props: Props) {
  return (
    <Form onSubmit={mocks.onSubmit}>
      {formProps => (
        <>
          <form onSubmit={formProps.handleSubmit}>
            <CheckboxArray {...props} />
            <button type={'submit'}>Submit</button>
          </form>
        </>
      )}
    </Form>
  );
}

describe('CheckboxArray', () => {
  let rendered: RenderResult;
  const spy = jest.spyOn(mocks, 'onSubmit');

  beforeAll(() => {
    mockAllProviderHooks();
  });

  async function clickSubmit() {
    await act(async () => {
      await fireEvent.click(
        screen.getByRole('button', { name: new RegExp('submit', 'i') })
      );
    });
  }

  async function clickOption(label: string) {
    return act(async () => {
      await fireEvent.click(screen.getByLabelText(label));
    });
  }

  describe('getInitialValues', () => {
    it('returns properly', () => {
      expect(getInitialValues(['ab', 'der', 'csa'])).toEqual({
        ab: false,
        der: false,
        csa: false
      });
    });
  });

  describe('with no values', () => {
    beforeEach(() => {
      rendered = render(
        <TestComponent label={'test'} name={'test'} options={['a', 'b']} />
      );
    });

    it('delivers proper values on submit', async () => {
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            a: false,
            b: false
          }
        },
        expect.anything(),
        expect.anything()
      );
    });

    it('after clicking a sets a to true', async () => {
      await clickOption('a');
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            a: true,
            b: false
          }
        },
        expect.anything(),
        expect.anything()
      );
    });

    it('after clicking all sets all to true', async () => {
      await clickOption('a');
      await clickOption('b');
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            a: true,
            b: true
          }
        },
        expect.anything(),
        expect.anything()
      );
    });
  });

  describe('with initial values', () => {
    beforeEach(() => {
      rendered = render(
        <TestComponent
          label={'test'}
          name={'test'}
          options={['a', 'b']}
          initialValue={{
            a: true
          }}
        />
      );
    });

    it('delivers proper values on submit', async () => {
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            a: true,
            b: false
          }
        },
        expect.anything(),
        expect.anything()
      );
    });

    it('after clicking a sets a to true', async () => {
      await clickOption('a');
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            a: false,
            b: false
          }
        },
        expect.anything(),
        expect.anything()
      );
    });

    it('after clicking all sets all to true', async () => {
      await clickOption('a');
      await clickOption('b');
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            a: false,
            b: true
          }
        },
        expect.anything(),
        expect.anything()
      );
    });
  });

  afterEach(() => {
    spy.mockClear();
  });
});
