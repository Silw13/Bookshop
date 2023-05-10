const CopyWebpackPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');
// Пришлось использовать PugPlugin, pug-loader из урока обновлялся последний раз 5 лет назад и наотрез отказался у меня запускаться 
const path = require('path');

module.exports = {
    entry: './src/index.pug',
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '/',
    },
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'img' },
                { from: 'src/icons', to: 'icons' }
            ],
        }),
        new PugPlugin({
            pretty: true,
            js: {
                filename: 'js/[name].[contenthash:8].js',
            },
            css: {
                filename: 'css/[name].[contenthash:8].css',
            },
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader'],
            },
        ]
    }
}