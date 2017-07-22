var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");

module.exports = {
    context: __dirname + "/frontend",
    devtool: debug ? "inline-sourcemap" : null,
    entry: ["babel-polyfill", "./js/client.jsx"],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: [
                        "react-html-attrs",
                        "transform-class-properties",
                        "transform-decorators-legacy"
                    ]
                }
            }
        ]
    },
    output: {
        path: __dirname + "/frontend/build/",
        filename: "client.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        })
    ]
};
