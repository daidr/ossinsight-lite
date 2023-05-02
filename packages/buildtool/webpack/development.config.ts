import { Configuration } from 'webpack';
import base from './base.config.js';
import { merge } from 'webpack-merge';
import { cwd, devappSrc } from './utils/path.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default merge<Configuration>(base, {
  mode: 'development',
  experiments: {},
  entry: {
    main: {
      import: devappSrc('main.tsx'),
      dependOn: 'vendor',
    },
    vendor: ['react', 'react/jsx-runtime', 'react-dom'],
    'devapp-entry': cwd('src/devapp-entry'),
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    // open: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: devappSrc('index.ejs'),
    }),
  ],
  output: {
    publicPath: '/',
  },
});
