export type MockContextHook<THookFn extends (...args: any[]) => any> = {
  (val?: ReturnType<THookFn>): jest.Mock<
    ReturnType<THookFn>,
    Parameters<THookFn>
  >;
  defaultValue: ReturnType<THookFn>;
};

export function mockHook<
  THookFn extends (...args: any[]) => any,
  Method extends string,
  Obj extends { [key in Method]: THookFn }
>(
  obj: Obj,
  method: Method,
  defaultValue: ReturnType<THookFn>
): MockContextHook<THookFn> {
  const makeMock = (
    val?: ReturnType<THookFn>
  ): jest.Mock<ReturnType<THookFn>, Parameters<THookFn>> => {
    return jest
      .spyOn(obj, method)
      .mockImplementation(
        (...args: Parameters<THookFn>) => val || defaultValue
      );
  };
  makeMock.defaultValue = defaultValue;
  return makeMock;
}
