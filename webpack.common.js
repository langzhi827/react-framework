/**
 *  Author: harry.lang
 *  Date: 2017/11/17
 *  Description: Created by harrylang on 2017/11/17.
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let config = {
    //devtool: 'source-map', // https://webpack.js.org/configuration/devtool/#special-cases
    entry: {
        main: './src/main.js',
        vender: [
            'react',
            'react-dom',
            'react-router-dom',
            'react-loadable'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true || {/* CSSNano Options */}
                        }
                    },
                    'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的图片base64内联
                    name: '[name].[hash].[ext]',
                    outputPath: 'images/'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CommonsChunkPlugin({
            name: 'vender',
            filename: '[name].bundle.js'
        })
    ]
};

module.exports = config;

