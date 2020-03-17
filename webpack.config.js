const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        path: path.join(__dirname, "/dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ],
    devServer: {
        port: 3000,
        hot: true
    },
};