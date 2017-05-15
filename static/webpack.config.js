// var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

process.env.NODE_ENV = 'development';

module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "public/bundle.js"
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
         loaders: [{
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel",
              include: __dirname,
              query: {
                presets: [ 'es2015', 'react', 'react-hmre' ]
              }
        }]
    },
    plugins: [
    //     new LiveReloadPlugin()
        new webpack.HotModuleReplacementPlugin()
    ]
};