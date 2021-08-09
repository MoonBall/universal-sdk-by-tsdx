import './entry';
import { testMd5 } from './use-crypto';

export const browserSum = (a: number, b: number) => {
  testMd5();
  if ('development' === process.env.NODE_ENV) {
    console.log('browserSum boop');
  }
  return a + b;
};

browserSum(1, 2);
