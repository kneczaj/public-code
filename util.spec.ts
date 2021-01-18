import { joinWords } from "./util";

describe('joinWords', () => {
  it('with one element', () => {
    expect(joinWords(['a'], ', ', ' lub ')).toBe('a');
  });
  it('with two elements', () => {
    expect(joinWords(['a', 'b'], ', ', ' lub ')).toBe('a lub b');
  });
  it('with long array', () => {
    expect(joinWords(['a', 'b', 'c'], ', ', ' lub ')).toBe('a, b lub c');
  });
});
