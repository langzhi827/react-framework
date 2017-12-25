/**
 *  Author: harry.lang
 *  Date: 2017/11/17
 *  Description: Created by harrylang on 2017/11/17.
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let config = {
    //devtool: 'source-map', // https://webpack.js.org/configuration/devtool/#special-cases
    entry: {
        main: './src/main.js',
        vender: [
            'react',
            'react-dom',
            'react-router-dom',
            'react-loadable',
            'redux',
            'react-redux',
            'redux-thunk',
            'whatwg-fetch'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/chunks/[name].[chunkhash:8].js',
        publicPath: ''
    },
    resolve: {
        // 定义别名
        alias: {
            'rootReducer': path.resolve(__dirname, 'src/store/rootReducer'),
            'SRC_PATH': path.resolve(__dirname, 'src')
        },
        // 告诉webpack解析模块时应该搜索哪些目录
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }, 'eslint-loader']
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
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'images/'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CommonsChunkPlugin({
            name: 'vender',
            filename: 'js/[name].[chunkhash:8].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new CopyWebpackPlugin([
            {from: './src/config', to: 'config/[name].[ext]'},
            {from: './src/mock_data', to: 'mock_data'}
        ]),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['config/env-config.js'],
            append: false,
            hash: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ]
};

module.exports = config;

