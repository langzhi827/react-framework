/**
 *  Author: harry.lang
 *  Date: 2017/11/21
 *  Description: Created by harrylang on 2017/11/21.
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const webpackIsomorphicToolsPlugin =
    new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
        .development();

const common = require('./webpack.common.js');

common.cssRules.use = ExtractTextPlugin.extract({
    fallback: common.cssRules.use.splice(0, 1)[0], // 当CSS不被提取时，使用style-loader将css加载到js中去
    use: common.cssRules.use // 将资源转换为CSS导出模块的加载程序（必需）
});

module.exports = merge(common.baseConfig, {
    //devtool: 'source-map',
    module: {
        rules: [common.cssRules]
    },
    plugins: [
        //new UglifyJSPlugin({
        //    sourceMap: true
        //}),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true
        }),
        webpackIsomorphicToolsPlugin,
        new MyPlugin()
    ]
});

function MyPlugin(options) {
}

MyPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            htmlPluginData.html = htmlPluginData.html.replace('$content$', '<%- content %>');
            callback(null, htmlPluginData);
        });
    });

};