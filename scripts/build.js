const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');

const pwd = path.resolve(__dirname, '../');
async function build() {
  {
    console.log('exec:', 'yarn build:browser');
    const task = execa('yarn', ['build:browser']);
    task.stdout.pipe(process.stdout);
    await task;
  }

  // copy to browser
  console.log('copy dist to browser');
  const distDirPath = path.resolve(pwd, 'dist');
  const browserDirPath = path.resolve(pwd, 'browser');
  // 当使用方使用 `universal-sdk-by-tsdx/browser` 导入时，
  // TS 将使用浏览器环境的类型文件。
  // 仅在浏览器环境的 TS 定义和 Node.js 环境的 TS 定义不同时需要
  await fs.move(
    path.resolve(distDirPath, 'browser-index.d.ts'),
    path.resolve(distDirPath, 'index.d.ts'),
    { overwrite: true }
  );
  await fs.rm(browserDirPath, { recursive: true, force: true });
  await fs.mkdir(browserDirPath, { recursive: true });
  await fs.copy(distDirPath, browserDirPath, { overwrite: true });

  {
    console.log('exec:', 'yarn build:node');
    const task = execa('yarn', ['build:node']);
    task.stdout.pipe(process.stdout);
    await task;
  }
}

async function main() {
  try {
    await build();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
