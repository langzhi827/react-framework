const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');
const manifest = require('./manifest.json');
const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];

const NODE_ENV = process.env.NODE_ENV;
const ANALYZE = process.env.ANALYZE;

// 主题样式设置
let antTheme = {};
if (pkg.antTheme && typeof (pkg.antTheme) === 'string') {
    antTheme = require(pkg.antTheme)();
} else if (pkg.antTheme && typeof (pkg.antTheme) === 'object') {
    antTheme = pkg.antTheme;
}

let baseConfig = {
    mode: NODE_ENV || 'development',
    // https://webpack.js.org/configuration/devtool/#special-cases
    devtool: NODE_ENV !== 'production' ? 'eval-source-map' : 'source-map',
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
                    outputPath: 'images',
                    publicPath: '../images' // 指定图片的公共路径
                }
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192, // <= 8kb的base64内联
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'fonts',
                    publicPath: '../fonts'
                }
            }
        ]
    },
    optimization: {
        minimizer: [],
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
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
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn/
        )
    ]
};

// 处理代码分析插件
if (ANALYZE === '1') {
    baseConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'server', // static disabled
            analyzerHost: '127.0.0.1',
            analyzerPort: '8888'
        })
    );
}

/**
 * 获取样式规则配置
 * @param {*} isCSSModules 是否使用css-modules
 */
function getCssRule(isCSSModules = true) {
    let cssConfig = {
        test: /\.(css|less)$/,
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    localsConvention: 'dashesOnly',
                    modules: isCSSModules ? {
                        localIdentName: '[local]-[hash:base64:5]'
                    } : false
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'resolve-url-loader', // 处理文件中的所有url地址
                options: {
                    sourceMap: true,
                }
            },
            {
                loader: "less-loader",
                options: {
                    sourceMap: true,
                    modifyVars: antTheme,
                    javascriptEnabled: true
                }
            }
        ]
    };

    // 处理cssModule不同配置
    if (isCSSModules) {
        cssConfig.exclude = /(node_modules|src\/assets)/;
    } else {
        cssConfig.include = /(node_modules|src\/assets)/;
    }

    return cssConfig;
};

let cssRules = [getCssRule(), getCssRule(false)];
if (NODE_ENV !== 'production') {
    // css 处理
    cssRules.forEach(cssRule => {
        cssRule.use.unshift('style-loader');
    });
    baseConfig.module.rules = baseConfig.module.rules.concat(cssRules);

    // devServer
    /* baseConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin({})
    ); */
    baseConfig.devServer = {
        contentBase: './dist',
        host: '0.0.0.0',
        compress: true,
        port: 9999,
        // 需要webpack.HotModuleReplacementPlugin才能完全启用HMR。
        // 如果使用--hot选项启动webpack或webpack-dev-server，则会自动添加该插件，因
        // 此您可能不需要将其添加到webpack.config.js中
        // 注意：热更新(HMR)不能和[chunkhash]同时使用
        //hot: true
    };
} else {
    // css 处理
    cssRules.forEach(cssRule => {
        cssRule.use.unshift(MiniCssExtractPlugin.loader);
    });
    baseConfig.module.rules = baseConfig.module.rules.concat(cssRules);
    baseConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash:8].css',
            chunkFilename: 'styles/[name].[hash:8].css'
        })
    );
    baseConfig.optimization.minimizer.push(
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            },
            canPrint: true //是否将插件信息打印到控制台
        })
    );

    // js 压缩处理
    baseConfig.optimization.minimizer.push(
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            sourceMap: true,
            cache: true,
            parallel: true,
            uglifyOptions: {
                warnings: false
            }
        })
    );
}

module.exports = baseConfig;


