'use strict'


const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
        './src/app.js'
    ],
    output: {
        path: path.resolve(__dirname, './public/assets/js'),
        publicPath: '/public/assets/js/',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
