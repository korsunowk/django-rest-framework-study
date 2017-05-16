var webpack = require('webpack');
var path = require("path");
var BundleTracker = require('webpack-bundle-tracker');

process.env.NODE_ENV = 'development';

module.exports = {
    entry:[
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        "./js/app.js",
    ],
    output: {
        path: path.resolve('./bundles/'),
        filename: "[name]-[hash].js",
        publicPath: 'http://localhost:3000/bundles/',
    },
    module: {
        rules: [
            {
              enforce: "pre",
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'eslint-loader'
            },
        ],
         loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel'],
            },
        ],
    },
    devServer: {
       headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8000" }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
    ]
};