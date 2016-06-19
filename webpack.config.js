var webpack = require('webpack');

module.exports = {
    entry: {
        app: "./src/entry.js",
        vendor: ["jquery", "moment"],
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {// SASS
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: './src/scss/**/*.scss'
            },
            {// BABEL
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },
            {//Modernizr
                test: /[\\\/]bower_components[\\\/]modernizr[\\\/]modernizr\.js$/,
                loader: "imports?this=>window!exports?window.Modernizr"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
        // new webpack.ProvidePlugin({moment: "moment"}),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    ]
};