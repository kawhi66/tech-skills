'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// yarn dev --type=plain-vue
const argv = require('minimist')(process.argv.slice(2));
console.log(argv.type);

module.exports = {
    entry: `./skills/${argv.type}/index.js`,
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: "development", // production
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        [
                            '@babel/plugin-transform-runtime', {
                                helpers: false // 在 @babel/runtime 7.5.X 上，@babel/runtime/helpers/typeof 会引起报错，https://github.com/babel/babel/issues/10178
                            }
                        ]
                    ]
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'vue-style-loader', 'css-loader']
        }, {
            test: /\.html$/,
            // loader: 'html-loader' // 会与 HtmlWebpackPlugin 冲突
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        open: true,
        port: 5000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: argv.type
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
};
