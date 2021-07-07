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
    'abacus': [path.join(PATHS.src, '/scripts/abacus.ts'), path.join(PATHS.src, '/styles/abacus.scss')],
    'abacus-demo': [path.join(PATHS.src, '/scripts/abacus-demo.ts'), path.join(PATHS.src, '/styles/abacus-demo.scss')],
		'abacus-tests': [path.join(PATHS.src, '/scripts/tests.ts')],
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
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      // },
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
            // options: {
            //   hmr: isDev,
            // },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
      // 	// loader: 'file-loader?name=assets/fonts/[name].[ext]',
      // 	loader: 'file-loader',
      // 	options: {
      // 		name: 'assets/fonts/[name].[ext]'
      // 	},
      // }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PATHS.src + '/styles/images',
          to: PATHS.dist + '/images/'
        },
				{
          from: PATHS.root + '/node_modules/jquery/dist/jquery.min.js',
          to: PATHS.dist
        },
				{
          from: PATHS.root + '/node_modules/mocha/mocha.js',
          to: PATHS.dist
        },
				{
          from: PATHS.root + '/node_modules/mocha/mocha.css',
          to: PATHS.dist
        },
        // {
        //   from: PATHS.src + '/assets/**/*',
        //   to: PATHS.dist + '/assets',
        //   transformPath(targetPath, absolutePath) {
        //     return targetPath.replace('src/assets', '');
        //   }
        // },
      ]
    }),
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css?v=[fullhash]',
      // allChunks: true
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