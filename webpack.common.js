const path = require('path');

module.exports = {
    entry: {
        serviceWorker: './src/serviceWorker.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        clean: true,
    }
};