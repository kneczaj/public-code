import { mockHook } from '../utils';
import * as TestHook from './test-hook';
import { mocked } from './utils';

export const useTest = mockHook<
  typeof TestHook.useTest,
  'useTest',
  typeof TestHook
>(TestHook, 'useTest', { setStr: mocked.setStr, str: 'mockedStr' });
