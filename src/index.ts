import './entry';
import { testMd5 } from './use-crypto';

export const sum = (a: number, b: number) => {
  testMd5();
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

sum(1, 2);
