const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { main: './src/index.ts' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: dev ? '[name].[contenthash].js' : '[name].js',
    },
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    devServer: {
        compress: true,
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]',
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: dev ? '[name].[contenthash].css' : '[name].css',
        }),
    ]
};
