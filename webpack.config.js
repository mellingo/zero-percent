'use strict';
const webpack = require('webpack');
const Autoprefixer = require("autoprefixer");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV === "dev"? "development":"production";
const path = require('path');

module.exports = {
    mode: mode,
    devServer: {
        hot: true,
        watchOptions: {
            poll: true
        },
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                Autoprefixer()
                            ]
                        }

                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.(jpg|png|woff2?|otf)$/,
                loader: "file-loader"
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'theme': path.resolve(__dirname, 'src/theme'),
            'static': path.resolve(__dirname, 'src/static')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};
