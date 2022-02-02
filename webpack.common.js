const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "src", "index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "React Webpack Boilerplate",
            template: path.resolve(__dirname, "src", "template.html"),
            filename: "index.html"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: "asset/inline",
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            }
        ],
    },
};