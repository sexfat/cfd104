const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');



module.exports = {
    entry: {
        index: './main.js',
        back : './back.js'
    },               // 入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },              // 出口文件
   module: {
        rules: [{
            // 格式
            test: /\.(sass|scss|css)$/,
            //順序是由下到上 css > style
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: './dist'
                    }
                  },
                // 'style-loader',//跟MiniCssExtractPlugin 會衝突所以要關掉
                'css-loader',
                'sass-loader'
            ],
        },
        //babel loader
        {
            test: /\.(js)$/,
            exclude: /(node_modules)/,

            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }],
            include: path.resolve(__dirname, './'), //
        },

      ]

    },               // 處裡對應模組
    plugins: [
        //清理舊的檔案
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
        //前台
        new HtmlWebpackPlugin({
            chunks: ['index'],  //選擇注入資源 chunk
            inject: 'body', //預設<body> js </body>  head or body
            template: './index.html',
            //來源
            filename: 'index.html'
            // 目的地
        }),
        //後台
         new HtmlWebpackPlugin({
            chunks: ['back'],  //選擇注入資源 chunk
            inject: 'body', //預設<body> js </body>  head or body
            template: './back.html',
            //來源
            filename: 'back.html'
            // 目的地
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        // new webpack.ProvidePlugin({
        //     Vue: ['vue/dist/vue.esm.js', 'default']
        // })

    ],          // 對應的插件
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 3200,
        // 指定首頁檔案
        index: 'index.html',
        open: true
    },          // 服務器配置
    resolve: {
        alias: {
           vue: 'vue/dist/vue.js'
        }
      }, // 解決 vue 的路徑問題
    mode: 'development'     // 開發模式配置development   /  上線用 production
}