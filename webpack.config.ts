import * as path from 'path';
import * as webpack from 'webpack';
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');
const { TsConfigPathsPlugin, ForkCheckerPlugin } = require('awesome-typescript-loader');
const IS_PROD = process.argv.indexOf('-p') > -1;

export default {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: __dirname + '/demos/entry.ts',
  output: {
    filename: 'demos.js',
    path: IS_PROD ? __dirname + '/demos' : __dirname
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.ts$/,
      loader: 'tslint-loader?emitErrors=false&failOnHint=false',
      exclude: /node_modules/
    }, {
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader?forkChecker=true', 'angular2-template-loader'],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /(node_modules).+\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /demos\/.+\.(css|html)$/,
      loader: 'raw-loader'
    }, {
      test: /\.ejs$/,
      loader: 'ejs-compiled-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'angular-calendar$': path.resolve(__dirname, 'src/index.ts')
    }
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'demos'
  },
  plugins: [
    new ForkCheckerPlugin(),
    new TsConfigPathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
    }),
    new StyleLintPlugin({
      syntax: 'scss',
      context: 'scss'
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname + '/src'
    ),
    new FixDefaultImportPlugin()
  ],
  performance: {
    hints: false
  }
};
