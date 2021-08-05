const path = require('path');

function p(relativeSrcPath) {
  return path.resolve(__dirname, 'src', relativeSrcPath);
}

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    if (options.target === 'browser') {
      config.input = p('browser-index.ts');
    }

    return config; // always return a config.
  },
};
