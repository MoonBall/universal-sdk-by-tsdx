import './entry';

export const browserSum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('browserSum boop');
  }
  return a + b;
};
