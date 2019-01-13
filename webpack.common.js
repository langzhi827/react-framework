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
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');
const manifest = require('./manifest.json');
const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];

const NODE_ENV = process.env.NODE_ENV;

let antTheme = {};
if (pkg.antTheme && typeof (pkg.antTheme) === 'string') {
    antTheme = require(pkg.antTheme)();
} else if (pkg.antTheme && typeof (pkg.antTheme) === 'object') {
    antTheme = pkg.antTheme;
}

let baseConfig = {
    //devtool: 'source-map', // https://webpack.js.org/configuration/devtool/#special-cases
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: NODE_ENV !== 'production' ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: NODE_ENV !== 'production' ? 'chunks/[name].js' : 'chunks/[name].[chunkhash:8].js',
        publicPath: ''
    },
    resolve: {
        // 定义别名
        alias: {
            'rootReducer': path.resolve(__dirname, 'src/store/rootReducer'),
            '@': path.resolve(__dirname, 'src')
        },
        // 告诉webpack解析模块时应该搜索哪些目录
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    // webpack loader 解析目录
    resolveLoader: {
        modules: ['./webpack', 'node_modules'],
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
            // 处理router配置到可用路由组件
            {
                test: /config\/router\.config\.js/,
                use: [{
                    loader: 'react-router-config-loader'
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的图片base64内联
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'images/'
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的base64内联
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            exclude: [venderName + '.js', venderName + '.js.map']
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: 'common-chunks'
        }),
        new CopyWebpackPlugin([
            { from: './src/public', to: '' }
        ]),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html',
            favicon: './src/favicon.ico',
            //hash: true,
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [venderName + '.js'],
            append: false
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['env-config.js'],
            append: false,
            hash: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server', // static disabled
            analyzerHost: '127.0.0.1',
            analyzerPort: '8888'
        })
    ]
};

/**
 * 处理cssModule不同配置
 */
function setCssConfig(isCSSModules, cssConfig) {
    if (isCSSModules) {
        cssConfig.exclude = /(node_modules|src\/assets)/;
    } else {
        cssConfig.include = /(node_modules|src\/assets)/;
    }
}

/**
 * 获取样式规则配置
 * @param {*} isCSSModules 是否使用css-modules
 */
function getCssRule(isCSSModules = true) {
    let cssConfig = {
        test: /\.(css|less)$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    //importLoaders: 1,
                    sourceMap: true,
                    minimize: true || {/* CSSNano Options */ },
                    modules: isCSSModules,
                    localIdentName: '[name]-[local]-[hash:base64:5]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'resolve-url-loader',
                options: {}
            },
            {
                loader: "less-loader",
                options: {
                    sourceMap: true,
                    modifyVars: antTheme
                }
            }
        ]
    };

    setCssConfig(isCSSModules, cssConfig);

    return cssConfig;
};

exports.cssRules = [getCssRule(), getCssRule(false)];


exports.baseConfig = baseConfig;


