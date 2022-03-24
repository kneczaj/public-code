import { getDisplayedError } from './field';

xdescribe('getDisplayedError', () => {
  const mocks = {
    t: (...args: any[]) => 'translation'
  };

  const t = jest.spyOn(mocks, 't');

  it('supports string errors', () => {
    const result = getDisplayedError({ error: 'hello' }, mocks.t);
    expect(result).toEqual('translation');
    expect(t).toHaveBeenCalledTimes(1);
    expect(t).toHaveBeenCalledWith('hello');
  });

  it('ignores submitError when both exist', () => {
    const result = getDisplayedError(
      { submitError: 'submit', error: 'hello' },
      mocks.t
    );
    expect(result).toEqual('translation');
    expect(t).toHaveBeenCalledTimes(1);
    expect(t).toHaveBeenCalledWith('hello');
  });

  xit('supports array errors', () => {
    const result = getDisplayedError(
      { error: ['hello', { value: 2 }] },
      mocks.t
    );
    expect(result).toEqual('translation');
    expect(t).toHaveBeenCalledTimes(1);
    expect(t).toHaveBeenCalledWith('hello', { value: 2 });
  });

  it('ignores dict errors', () => {
    const result = getDisplayedError(
      {
        error: { hello1: 'hello', hello2: 'hello2' },
        submitError: { hello1: 'hello', hello2: 'hello2' }
      },
      mocks.t
    );
    expect(result).toEqual(undefined);
    expect(t).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    t.mockClear();
  });
});
