import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import TerserWebpackPlugin from "terser-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import PostCssSaveParser from "postcss-safe-parser";

module.exports = (env, options) => {
    // const development = process.env.NODE_ENV !== 'production';
    const development = !process.argv.includes('--prod');

    const config = {
        mode: development ? 'development' : 'production',
        entry: {
            index: ['@babel/polyfill', './src/index.js'],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[hash:8].js',
        },
        devServer: {
            overlay: true
        },
        resolve: {
            alias: {
                'assets': path.resolve(__dirname, './frontend/assets')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: '/node_modules/',
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            forceAllTransforms: !development,
                                            modules: false,
                                            useBuiltIns: false,
                                            debug: false,
                                        },
                                    ],
                                    [
                                        '@babel/preset-react',
                                        {
                                            development: development,
                                        },
                                    ],
                                ],
                                plugins: [
                                    ["@babel/plugin-proposal-class-properties", {"loose": false}],
                                    "@babel/plugin-transform-spread",
                                    '@babel/plugin-proposal-export-default-from',
                                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                                    ["@babel/plugin-syntax-dynamic-import"],
                                    ['@babel/plugin-transform-async-to-generator', {
                                        module: 'bluebird',
                                        method: 'coroutine',
                                    }],
                                    ...(development ? [] : [
                                        "@babel/transform-react-constant-elements",
                                        "transform-react-remove-prop-types"
                                    ])
                                ],
                                babelrc: false,
                            }
                        },
                    ],
                },
                {
                    test: /\.(less|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader',
                    ],
                },
                {
                    test: /\.(svg|png)$/,
                    oneOf: [
                        {
                            test: /\.(svg)$/,
                            use: [
                                {
                                    loader: 'url-loader',
                                }
                            ]
                        },
                        {
                            test: /\.(png)$/,
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: {
                                        name: '[path][name].[ext]',
                                    }
                                }
                            ]
                        }
                    ],
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new MiniCssExtractPlugin({
                filename: '[name].[hash:8].css',
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'public/index.html',
            }),
            ...(development ? [
                new webpack.HotModuleReplacementPlugin(),
            ] : [

            ])
        ],
        devtool: development ? 'source-map' : false,
        optimization: {
            minimize: !development,
            noEmitOnErrors: !development,
            minimizer: [
                new TerserWebpackPlugin({
                    parallel: true,
                    cache: true,
                    sourceMap: false,
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            passes: 2,
                            inline: 2
                        },
                        output: {
                            ecma: 5,
                            comments: false
                        },
                    },
                }),
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: {
                        parser: PostCssSaveParser,
                        map: false,
                        discardComments: { removeAll: true },
                    },
                }),
            ],
        }
    };

    return config;
};
