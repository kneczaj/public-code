// @ts-ignore
import mergeClassNames from 'merge-class-names';

export const merge = mergeClassNames as (...cssClasses: Array<string | false | undefined>) => string;
