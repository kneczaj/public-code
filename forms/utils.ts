/**
 *
 * @param fieldName it can be dot-separated path
 * @return all dots to dashes
 */
export function toId(fieldName: string): string {
  return fieldName.replace('.', '-');
}
