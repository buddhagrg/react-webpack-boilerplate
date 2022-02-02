const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "[name].[contenthash].bundle.js"
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...'],
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    plugins: [
        new webpack.ids.HashedModuleIdsPlugin(),
    ]
});