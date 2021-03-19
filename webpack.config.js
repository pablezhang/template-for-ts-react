/** @format */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageJson = require('./package.json');
const config = packageJson.config;
module.exports = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash:8].js',
    chunkFilename: '[name].[hash:8].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      publicPath: config['' + process.env.ENV].publicPath
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash].css'
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json'),
      name: 'lib'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } } // or whatever your project requires
              ],
              '@babel/preset-typescript',
              '@babel/preset-react'
            ],
            plugins: [
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'react-hot-loader/babel'
            ]
          }
        }
      },
      // 本地模块化 less
      {
        test: /\.less$/,
        use: [
          // 'style-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          'less-loader'
        ]
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      // 图片处理
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]', // 图片重命名
              limit: 1000 // 小于 1kb 自动解析成 base64 编码
            }
          }
        ]
      },
      {
        test: /\.(woff|eot|ttf)(\?t=(.*?))$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 9090,
    compress: true,
    historyApiFallback: true,
    open: true // 自动打开浏览器
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      pages: path.join(__dirname, 'src/pages'),
      Components: path.join(__dirname, 'src/components'),
      widget: path.join(__dirname, 'src/widget'),
      router: path.join(__dirname, 'src/router'),
      utils: path.join(__dirname, 'src/utils'),
      assets: path.join(__dirname, 'src/assets'),
      themes: path.join(__dirname, 'src/themes'),
      config: path.join(__dirname, 'src/config')
    }
  },
  mode: 'development'
};
