import './entry';
import { testSha256 } from './use-crypto';

export const sum = (a: number, b: number) => {
  testSha256();
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

sum(1, 2);
