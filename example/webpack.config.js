const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        include: path.resolve(__dirname, '../browser'),
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        use: 'source-map-loader',
      },
    ],
  },
  plugins: [new NodePolyfillPlugin()],

  devServer: {
    open: true,
    historyApiFallback: true,
  },
};
