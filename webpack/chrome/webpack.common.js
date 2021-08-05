const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('../webpack.common.js');
const { merge } = require('webpack-merge');
const webpack = require('webpack')

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            __BROWSER__: JSON.stringify('chrome')
        }),
    ]
});

console.log(module.exports);
console.log(common);