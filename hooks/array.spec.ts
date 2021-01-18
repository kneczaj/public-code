import { Hook, useArray } from "./array";

// TODO: find out hot to test hooks
xdescribe('useArray', () => {

  let array: Hook<number>;

  beforeEach(() => {
    array = useArray([1, 2]);
  });

  it('initializes', () => {
    expect(array.value).toEqual([1, 2]);
  });

  it('adds', () => {
    array.add(5);
    expect(array.value).toEqual([1, 2, 5]);
  });

  it('removes', () => {
    array.remove(1);
    expect(array.value).toEqual([2]);
  });
});
