const autoprefixer = require('autoprefixer');
const postCssFlexibility = require('postcss-flexibility');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postCssClassPrefix = require('postcss-class-prefix');

module.exports = {
  entry: './angular2-calendar.ts',
  output: {
    filename: './angular2-calendar.js',
    libraryTarget: 'umd',
    library: 'angular2Calendar'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    },
    'rxjs/Subject': {
      root: ['rx', 'Subject'],
      commonjs: 'rxjs/Subject',
      commonjs2: 'rxjs/Subject',
      amd: 'rxjs/Subject'
    },
    'rxjs/Subscription': {
      root: ['rx', 'Subscription'],
      commonjs: 'rxjs/Subscription',
      commonjs2: 'rxjs/Subscription',
      amd: 'rxjs/Subscription'
    }
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint?emitErrors=true&failOnHint=true', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'ts', exclude: /node_modules/,
      query: {
        compilerOptions: {
          declaration: true
        }
      }
    }, {
      test: /\.scss/,
      loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss!sass?sourceMap'),
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  plugins: [
    new StyleLintPlugin({
      syntax: 'scss',
      context: 'scss',
      failOnError: true
    }),
    new ExtractTextPlugin('./css/angular2-calendar.css')
  ],
  postcss: [
    autoprefixer({
      browsers: [
        '> 1%',
        'last 4 versions',
        'last 20 Chrome versions',
        'last 20 Firefox versions'
      ]
    }),
    postCssFlexibility,
    postCssClassPrefix('cal-')
  ]
};
