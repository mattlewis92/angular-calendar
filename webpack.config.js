const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const IS_PROD = process.argv.indexOf('-p') > -1;

module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: './demo/entry.ts',
  output: {
    filename: 'demo.js',
    path: IS_PROD ? './demo' : ''
  },
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint?emitErrors=false&failOnHint=false', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'ts', exclude: /node_modules/
    }, {
      test: /\.scss$/, loader: 'style!css!postcss!sass'
    }, {
      test: /\.css$/, loader: 'style!css'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'demo'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
    }),
    new StyleLintPlugin({
      syntax: 'scss',
      context: 'scss'
    })
  ]
};
