require('dotenv').config();
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js')

function modify(buffer) {
    // copy-webpack-plugin passes a buffer
    const manifest = JSON.parse(buffer.toString());

    // make modifications
    manifest.key = process.env.KEY;
    manifest.oauth2.client_id = process.env.CLIENT_ID;

    // pretty print to JSON with two spaces
    const manifest_JSON = JSON.stringify(manifest, null, 2);
    return manifest_JSON;
}

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/manifest.json",
                    to: "manifest.json",
                    transform(content, path) {
                        return modify(content)
                    }
                }
            ]
        })
    ]
})