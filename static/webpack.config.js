var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

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
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loaders: ["babel-loader"]
        }
        ]
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};