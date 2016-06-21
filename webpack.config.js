var webpack = require('webpack'),
    path = require("path"),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    stylelint = require('stylelint'),
    stylelintConfigStandard = require('stylelint-config-standard'),
    reporter = require("postcss-reporter"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'eval',
    entry: 

    {
        main: "./src/entry.js",
        vendor: ["jquery", "moment"],
        home: "./src/module/pages/page-home/entry.js"
    },
    // [
    //     'webpack-dev-server/client?http://localhost:8080',
    //     'webpack/hot/only-dev-server',
    //     './src/entry'
    // ],

    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: __dirname + "/dist"
        //chunkFilename: "[id].js"
    },
    module: {

        loaders: [
            {// SASS -- note: sass-loader 3.2.0 not working
                test: /\.scss$/,

                //loaders: ['style', 'css', 'postcss', 'sass']// loaders when using an array
                // minify: replace css with css?minimize
                loader: ExtractTextPlugin.extract("style-loader", "css!postcss!sass?sourceMap") // extract css and create file
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
        return [
            stylelint(stylelintConfigStandard),
            reporter({ clearMessages: true }),
            mqpacker,
            autoprefixer

        ]; //https://github.com/postcss/postcss
        //return [mqpacker, require("postcss-cssnext")()]; TODO: 
    },


    plugins: [

        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        // new webpack.ProvidePlugin({moment: "moment"}),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new ExtractTextPlugin('[name].css')
    ],
    debug: true
};