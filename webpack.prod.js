const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common.js');

let cssRules = common.cssRules;
cssRules.forEach(cssRule => {
    cssRule.use = ExtractTextPlugin.extract({
        fallback: cssRule.use.splice(0, 1)[0], // 当CSS不被提取时，使用style-loader将css加载到js中去
        use: cssRule.use // 将资源转换为CSS导出模块的加载程序（必需）
    });
});

module.exports = merge(common.baseConfig, {
    devtool: 'source-map',
    module: {
        rules: cssRules
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true
        })
    ]
});