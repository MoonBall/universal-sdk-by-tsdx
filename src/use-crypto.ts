import crypto from 'crypto';

export function testMd5() {
  const md5 = crypto.createHash('md5');
  const hex = md5.update('a').digest('hex');
  console.log('expect value: ', '0cc175b9c0f1b6a831c399e269772661');
  console.log('actual value: ', hex);
}
