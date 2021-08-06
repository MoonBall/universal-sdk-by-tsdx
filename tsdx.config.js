const path = require('path');
const replace = require('@rollup/plugin-replace');

function p(relativeSrcPath) {
  return path.resolve(__dirname, 'src', relativeSrcPath);
}

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(
      replace({
        'process.env.TARGET_ENVIRONMENT': `'${options.target}'`,
      })
    );

    if (options.target === 'browser') {
      config.input = p('browser-index.ts');
    }

    return config; // always return a config.
  },
};
