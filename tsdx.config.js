const path = require('path');
const alias = require('@rollup/plugin-alias');
const replace = require('@rollup/plugin-replace');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
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
        config.plugins.unshift(
          alias({
            entries: [
              {
                find: 'safer-buffer',
                replacement: p('browser/node-package/safer-buffer/safer.js'),
              },
            ],
          })
        );

        config.external = () => false;
        config.plugins.push(
          globals(),
          builtins({ crypto: true }),
          commonjs({
            include: /safer-buffer/,
          })
        );
      }
    }

    return config; // always return a config.
  },
};
