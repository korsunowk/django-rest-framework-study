var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: "./js/app.js",
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
        ]
    },
    plugins: [
        new LiveReloadPlugin()
    ]
};