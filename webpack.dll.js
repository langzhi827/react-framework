const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

const config = {
    mode: NODE_ENV || 'development',
    devtool: NODE_ENV !== 'production' ? 'eval-source-map' : 'source-map',
    entry: {
        vender: [
            'react',
            'react-dom',
            'prop-types',
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
        filename: '[name].[chunkhash:8].js',
        library: '[name]_[chunkhash:8]'
    },
    plugins: [
        new CleanWebpackPlugin({}),
        new webpack.DllPlugin({
            path: 'manifest.json',  // manifest文件的输出路径
            name: '[name]_[chunkhash:8]',   // dll暴露的对象名,跟output.library保持一致
            context: __dirname       // 解析包路径的上下文
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};

module.exports = config;