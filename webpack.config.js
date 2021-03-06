const path = require('path')


const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        open: true,
        port: 2333
    },
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),

    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {},
                    transformAssetUrls: {
                        'v-img': 'src'
                    }
                }
            },
            {
                test: /\.(jpeg|jpg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        fallback: 'file-loader',
                        name: '[name].[ext]',
                        limit: 2048,
                        outputPath: './img',
                        publicPath: './img',
                        esModule: false,
                    }
                }]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
        }
    }
}