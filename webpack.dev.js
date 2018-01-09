/**
 *  Author: harry.lang
 *  Date: 2017/11/21
 *  Description: Created by harrylang on 2017/11/21.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common.baseConfig, {
    devtool: 'eval-source-map ',
    module: {
        rules: [common.cssRules]
    },
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        compress: true,
        port: 9999
    }
});