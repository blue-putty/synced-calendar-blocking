const { merge } = require('webpack-merge');
const { SourceMapDevToolPlugin } = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new SourceMapDevToolPlugin({})
    ]
});
