const path = require('path');

const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  devServer: {
    port: 3000,
  },
  devtool: 'source-map',
  entry: [
    './src/index.js',
    './src/public/styles/index.css',
    './src/public/index.html',
  ],
  mode,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                      stage: 0,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimize: mode === 'production',
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        extractComments: true,
      }),
    ],
  },
  output: {
    clean: true,
    filename: mode === 'production' ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: 'src/public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename:
        mode === 'production' ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  target: 'web',
};
