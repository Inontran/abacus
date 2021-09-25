const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const PATHS = {
  root: __dirname,
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
};

module.exports = {
  mode: 'development',
  entry: {
    'abacus': path.join(PATHS.src, '/abacus.ts'),
    'abacus-demo': path.join(PATHS.root, 'demo-page/abacus-demo.ts'),
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js?v=[fullhash]',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias:{
      '@': PATHS.src,
    }
  },
  devServer: {
    port: 4200,
    hot: true,
    open: true,
    contentBase: PATHS.dist,
  },
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: isProd ? 'tsconfig.prod.json' : 'tsconfig.json',
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PATHS.root + '/demo-page/**/*.(jpg|jpeg|png|gif|svg)',
          to: PATHS.dist + '/images/'
        },
        {
          from: PATHS.root + '/node_modules/jquery/dist/jquery.min.js',
          to: PATHS.dist
        },
        {
          from: PATHS.root + '/uml/**/*.svg',
          to: PATHS.dist,
          noErrorOnMissing: true
        },
        {
          from: PATHS.root + '/docs',
          to: PATHS.dist + '/docs/',
          noErrorOnMissing: true
        },
      ]
    }),
    new HtmlWebpackPlugin({
      template: PATHS.root + '/demo-page/demo-page.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css?v=[fullhash]',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
  ],
  externals: {
    jquery: 'jQuery',
  },
};