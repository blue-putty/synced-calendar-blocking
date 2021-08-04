const path = require('path');
require('dotenv').config();
const webpack = require('webpack');
const manifest = require('./src/manifest.json')

module.exports = {
    mode: 'production',
    entry: {
        serviceWorker: './src/serviceWorker.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    
    plugins: [
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        'process.env.KEY': JSON.stringify(process.env.KEY)
    }),]
};