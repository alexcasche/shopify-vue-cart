const { resolve } = require('path')
const { getIfUtils } = require('webpack-config-utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = env => {
    const { ifProd, ifNotProd } = getIfUtils(env)
    const config = {
        context: resolve('src'),
        entry: {
            'vue-cart': './vue-cart.js'
        },
        output: {
            filename: '[name].js',
            path: resolve('dist'),
            publicPath: '/dist/',
            pathinfo: ifNotProd(),
        },
        devtool: ifProd('source-map', 'eval'),
        watch: ifNotProd(),
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loaders: ['vue-style-loader', 'css-loader', 'postcss-loader']
                },
            ],
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
    }
    if (env.debug) {
        console.log(config)
        debugger
    }
    return config
}