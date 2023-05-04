const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.pug",
            filename: "index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'img' },
                { from: 'src/icons', to: 'icons' }
            ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    }
}