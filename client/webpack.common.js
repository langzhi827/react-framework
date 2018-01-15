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

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const pkg = require('../package.json');
const manifest = require('./manifest.json');
const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];

const NODE_ENV = process.env.NODE_ENV;

let antTheme = {};
if (pkg.antTheme && typeof(pkg.antTheme) === 'string') {
    antTheme = require(pkg.antTheme)();
} else if (pkg.antTheme && typeof(pkg.antTheme) === 'object') {
    antTheme = pkg.antTheme;
}

let baseConfig = {
    context: path.resolve(__dirname),
    //devtool: 'source-map', // https://webpack.js.org/configuration/devtool/#special-cases
    entry: {
        main: path.resolve(__dirname, './src/main.js')
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
            children: true
        }),
        new CopyWebpackPlugin([
            {from: './src/env-config.js', to: '[name].[ext]'},
            {from: './src/mock_data', to: 'mock_data'}
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
        })
    ]
};

exports.cssRules = {
    test: /\.(css|less)$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                //importLoaders: 1,
                sourceMap: true,
                minimize: true || {/* CSSNano Options */}
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                path: path.resolve(__dirname, 'postcss.config.js')
            }
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

exports.baseConfig = baseConfig;

