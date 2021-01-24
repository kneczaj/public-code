import {Form} from "react-final-form";
import React from "react";
import {DateField, Props} from "public/forms/fields/date-field";
import {mockAllProviderHooks} from "public/mocks";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MuiPickersUtilsProvider} from "app/root/providers/mui-pickers";
import { DateTime } from "luxon";
import { dateOnly } from "../../date-utils";

const mocks = {
  onSubmit: (values: any) => {}
}

function TestComponent(props: Omit<Props, 'name'>) {
  return (
    <MuiPickersUtilsProvider>
      <Form
        onSubmit={mocks.onSubmit}
      >
        {(formProps) => <>
          <form onSubmit={formProps.handleSubmit}>
            <DateField {...props} name={'test'} label={'test'}/>
            <button type={'submit'}>Submit</button>
          </form>
        </>}
      </Form>
    </MuiPickersUtilsProvider>
  )
}

const getSubmitButton = () => screen.getByRole('button', {name: new RegExp('submit', 'i')});

async function clickSubmit() {
  await act(async () => {
    await fireEvent.click(getSubmitButton());
  });
}

async function click() {
  await act(async () => {
    await fireEvent.click(screen.getByRole('button', {name: new RegExp('submit', 'i')}));
  });
}

describe('Date field', () => {

  let spy = jest.spyOn(mocks, 'onSubmit');

  afterEach(() => {
    spy.mockClear();
  });

  describe('without initial value', () => {
    beforeAll(() => {
      mockAllProviderHooks();
    });
    beforeEach(() => {
      render(<TestComponent/>);
    });
    it('submits as empty', async () => {
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith({
        test: undefined
      }, expect.anything(), expect.anything());
    });
    // it.only('after setting a value', async () => {
    //   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    //   await act(async () => {
    //     await fireEvent.click(screen.getByRole('textbox'));
    //     await fireEvent.click(screen.getByRole('button', { name: '1' }));
    //   });
    //   expect(screen.getByRole('button', { name: '1' })).toHaveClass('MuiPickersDay-daySelected');
    //   await act(async () => {
    //     await fireEvent.click(screen.getByRole('button', {name: 'OK'}))
    //   });
    //   await waitFor(() => expect(screen.queryByRole('button', {name: new RegExp('submit', 'i')})).not.toBeInTheDocument());
    //   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    //
    //   // screen.debug(undefined, 100000);
    //
    //   await clickSubmit();
    //   expect(spy).toHaveBeenCalledWith({
    //     test: undefined
    //   }, expect.anything(), expect.anything());
    // });
  });
  describe('with initial value', () => {
    const initial = dateOnly(DateTime.utc(2020, 1, 2));
    beforeAll(() => {
      mockAllProviderHooks();
    });
    beforeEach(() => {
      render(<TestComponent initialValue={initial}/>);
    });
    it('submits as empty', async () => {
      await clickSubmit();
      expect(spy).toHaveBeenCalledWith({
        test: initial
      }, expect.anything(), expect.anything());
    });
  });
});
