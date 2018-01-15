/**
 *  Author: harry.lang
 *  Date: 2018/1/12
 *  Description: Created by harrylang on 2018/1/12.
 */
const path = require('path');

var basePath = process.cwd();
const iconUrl = path.resolve(basePath, 'client/src/assets/fonts/antd/font_148784_r2qo40wrmaolayvi');
// antd icon-url 调用入口
const antStyleUrl = path.resolve(basePath, 'node_modules/antd/es/style/core');

module.exports = () => {
    return {
        'primary-color': '#1DA57A',
        'icon-url': '"' + path.relative(antStyleUrl, iconUrl) + '"'
    };
};
