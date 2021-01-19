import { naturalNumberParser } from "./parser";

describe('naturalNumberParser', () => {
  it('parses numbers in string format', () => {
    expect(naturalNumberParser("1")).toBe(1);
    expect(naturalNumberParser("123")).toBe(123);
  });
  it('passes other values', () => {
    expect(naturalNumberParser("a")).toBe("a");
    expect(naturalNumberParser(".")).toBe(".");
    expect(naturalNumberParser("53241.")).toBe("53241.");
  });
});
