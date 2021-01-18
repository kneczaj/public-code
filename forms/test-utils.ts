import { ReactWrapper } from "enzyme";

export function checkSubmit(wrapper: ReactWrapper, spy: any, fieldName: string, expectedPayload: any) {
  wrapper.find('form').simulate('submit');

  expect(spy).toHaveBeenCalledWith({
    [fieldName]: expectedPayload
  }, expect.anything(), expect.anything());
  spy.mockClear();
}
