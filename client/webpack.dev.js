/**
 *  Author: harry.lang
 *  Date: 2017/11/21
 *  Description: Created by harrylang on 2017/11/21.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common.baseConfig, {
    devtool: 'eval-source-map ',
    module: {
        rules: [common.cssRules]
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin({})
    ],
    devServer: {
        contentBase: './client/dist',
        host: '0.0.0.0',
        compress: true,
        port: 9999,
        // 需要webpack.HotModuleReplacementPlugin才能完全启用HMR。
        // 如果使用--hot选项启动webpack或webpack-dev-server，则会自动添加该插件，因
        // 此您可能不需要将其添加到webpack.config.js中
        // 注意：热更新(HMR)不能和[chunkhash]同时使用
        //hot: true
    }
});