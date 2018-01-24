/**
 *  Author: harry.lang
 *  Date: 2018/1/16
 *  Description: Created by harrylang on 2018/1/16.
 */
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const path = require('path');

module.exports = {
    //debug: true,
    webpack_assets_file_path: path.resolve(__dirname, 'webpack-assets.json'),
    webpack_stats_file_path: path.resolve(__dirname, 'webpack-stats.json'),
    assets: {
        images: {
            extensions: ['png', 'jpg', 'gif'],
            path: function (module, options, log) {
                if (module.name.indexOf('./src') > -1) {
                    return module.name.replace('./src', '../client/src')
                }
                return module.name
            }

        },
        fonts: {
            extensions: ['svg', 'woff', 'woff2', 'eot', 'ttf']
        },
        styles: {
            extensions: ['less', 'css'],
            path: function (module, options, log) {
                if (module.name.indexOf('./src') > -1) {
                    return module.name.replace('./src', '../client/src')
                }
                return module.name
            }
        }
    }
};