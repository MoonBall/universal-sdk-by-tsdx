import crypto from 'crypto';

export function testSha256() {
  const secret = 'abcdefg';
  const hash = crypto
    .createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');
  console.log(
    'expect value: ',
    'c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e'
  );
  console.log('actual value: ', hash);
  console.log(hash);
}
