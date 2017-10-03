const webpack = require("webpack");
const path = require("path");
const TransferWebpackPlugin = require("transfer-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: {
        vendor: [
            "react",
            "react-dom",
            "redux",
            "react-redux",
            "lodash"
        ],
        listener: "./src/listener/listener.js",
        main: [
            "./src/app/app.js",
        ],
    },
    // Render source-map file for final build
    devtool: "source-map",
    // output config
    output: {
        path: path.resolve(__dirname, "build"), // Path of output file
        filename: "[name].js?[hash]", // Name of output file
        chunkFilename: "[name].js?[chunkHash]",
    },
    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            },
            "window.com.mainlevel": {
                NODE_ENV: JSON.stringify("production"),
                BASE_URL: JSON.stringify("https://pisa-dev.prodyna.com/rest"),
                BASE_REDIRECT_URL: JSON.stringify("https://pisa-dev.prodyna.com")
            }
        }),
        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        // Transfer Files
        new TransferWebpackPlugin([
            { from: "www" },
        ], path.resolve(__dirname, "src")),
        // Extract sass then postcss to css
        new ExtractTextPlugin({
            filename: "app-[hash].css",
            allChunks: true,
        }),
        // I add esj template as it is easier to add hashed js and css
        // also think to move title to package.json
        new HtmlWebpackPlugin({
            template: path.join(__dirname + "/src/www", "index.ejs"),
            path: __dirname + "/src/www",
            pkg: require("./package.json"),
            filename: "index.html",
            inject: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: true,
                }
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ "css-loader", "postcss-loader", "sass-loader" ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=[path][hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
    }
};

module.exports = config;
