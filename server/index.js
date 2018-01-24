/**
 *  Author: harry.lang
 *  Date: 2018/1/18
 *  Description: Created by harrylang on 2018/1/18.
 */
const path = require('path');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// 使用babel-register解析antd及其所有相关组件
let dependencies = ['antd'];
const antdPck = require('antd/package.json');
dependencies = dependencies.concat(Object.keys(antdPck.dependencies));

const ignoreRegExp = 'node_modules\/(?!(' + dependencies.join('|') + '))';

require('babel-register')({
    ignore: new RegExp(ignoreRegExp),
    "presets": ["env", "react", "stage-0"],
    // 处理routes中import https://github.com/thgreasi/babel-plugin-system-import-transformer
    "plugins": ["system-import-transformer"]
});

const projectBasePath = path.resolve(__dirname, '');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../client/webpack-isomorphic-tools-configuration'))
    .server(projectBasePath, function () {
        require('./app');
    });

