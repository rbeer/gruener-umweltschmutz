const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');
const dirFavIcon = path.join(dirAssets, 'favicon');

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    babel: 'babel-polyfill',
    main: path.join(dirApp, 'index')
  },
  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
    }),

    new CopyWebpackPlugin([
      { from: dirFavIcon, to: 'favicon/' },
      { from: path.join(dirFavIcon, 'browserconfig.xml'), to: 'browserconfig.xml' },
      { from: path.join(dirAssets, 'images'), to: 'images' }
    ]),

    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[name].[hash:8].css'
    })
  ],
  module: {
    rules: [{ // BABEL
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
      options: {
        presets: [
          '@babel/preset-env',
          { 'plugins': ['@babel/plugin-proposal-class-properties'] }
        ],
        compact: true
      }
    }, { // STYLES
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }, { // IMAGES
      test: /\.jpg$/,
      use: 'file-loader'
    }]
  }
};
