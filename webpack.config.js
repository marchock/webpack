var webpack = require('webpack'),
    path = require("path"),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    stylelint = require('stylelint'),
    stylelintConfigStandard = require('stylelint-config-standard'),
    reporter = require("postcss-reporter"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    entry: {
        //main: "./src/entry.js",
        vendor: ["jquery", "moment"],
        home: "./src/module/pages/page-home/home.js",
        about: "./src/module/pages/page-about/about.js"
    },

    output: {
        path: __dirname + "/dist",
        filename: "js/[name].js",
        publicPath: __dirname + "/dist"
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
            //stylelint(stylelintConfigStandard),
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
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"js/vendor.bundle.js"),
        new ExtractTextPlugin('css/[name].css'),
        new LiveReloadPlugin(),// this works with watch "webpack --progress --colors --watch"

        // UGLIFY JS
        //https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false
        // })


        //new HtmlWebpackPlugin(), // Generates default index.html
        new HtmlWebpackPlugin({  // Also generate a home.html
          filename: 'home.html',
          template: 'src/module/pages/page-home/home.html',
          excludeChunks: ['about']
        }),
        new HtmlWebpackPlugin({  // Also generate a about.html
          filename: 'about.html',
          template: 'src/module/pages/page-about/about.html',
          excludeChunks: ['home']
        })
    ],
    debug: true
};



