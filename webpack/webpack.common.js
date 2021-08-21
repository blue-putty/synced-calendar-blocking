const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/popup.js',
    serviceWorker: './src/serviceWorker.js',
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/64.png',
          to: '64.png',
        },
        {
          from: './src/popup.html',
          to: 'popup.html',
        },
        {
          from: './src/css/popup.css',
          to: 'css/popup.css',
        },
      ],
    }),
  ],
};
