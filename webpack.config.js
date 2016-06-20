var webpack = require('webpack'),
    path = require("path"),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/entry.js",
        vendor: ["jquery", "moment"],
        home: "./src/module/pages/page-home/entry.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        //chunkFilename: "[id].js"
    },
    module: {
        loaders: [
            {// SASS -- note: sass-loader 3.2.0 not working
                test: /\.scss$/,

                //loaders: ['style', 'css', 'postcss', 'sass']// loaders when using an array

                loader: ExtractTextPlugin.extract("style-loader", "css?minimize!postcss!sass") // extract css and create file
            },
            {// BABEL
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    postcss: function () {
        return [mqpacker, autoprefixer]; //https://github.com/postcss/postcss
        //return [mqpacker, require("postcss-cssnext")()]; TODO: 
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        // new webpack.ProvidePlugin({moment: "moment"}),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new ExtractTextPlugin('[name].css')
    ]
};