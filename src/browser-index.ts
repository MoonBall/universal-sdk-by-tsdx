import './entry';
import { testSha256 } from './use-crypto';

export const browserSum = (a: number, b: number) => {
  testSha256();
  if ('development' === process.env.NODE_ENV) {
    console.log('browserSum boop');
  }
  return a + b;
};

browserSum(1, 2);
