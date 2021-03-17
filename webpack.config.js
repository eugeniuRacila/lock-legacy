const path = require('path');

// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
  entry: ['./src/', './src/public/styles/index.css'],
  mode,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        sideEffects: true,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [...minimizer, new CssMinimizerPlugin()],
  // },
  output: {
    clean: true,
    filename: '[name].[contenthash].bundle.js',
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
};
