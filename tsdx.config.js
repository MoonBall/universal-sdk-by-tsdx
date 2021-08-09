const path = require('path');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');

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

      {
        const resolverPluginIdx = config.plugins.findIndex(
          it => it.name === 'node-resolve'
        );
        config.plugins[resolverPluginIdx] = nodeResolve.default({
          browser: true,
          mainFields: ['module', 'main'],
          extensions: [...nodeResolve.DEFAULTS.extensions, '.jsx'],
        });
      }

      if (options.format === 'umd') {
        config.external = () => false;
        config.plugins = config.plugins.filter(
          it => it && it.name !== 'commonjs'
        );
        config.plugins.push(
          commonjs({
            include: [/use-crypto/, /\/node_modules\//],
          })
        );
      }
    }

    return config; // always return a config.
  },
};
