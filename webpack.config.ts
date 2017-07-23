import * as path from 'path';
import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as StyleLintPlugin from 'stylelint-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { AotPlugin } from '@ngtools/webpack';
import * as OfflinePlugin from 'offline-plugin';

export default (env = 'development') => {

  const { ifProduction, ifDevelopment } = getIfUtils(env);

  return {
    devtool: ifProduction('source-map', 'eval'),
    entry: path.join(__dirname, 'demos', 'entry.ts'),
    output: {
      filename: ifProduction('[name]-[chunkhash].js', '[name].js')
    },
    module: {
      rules: removeEmpty([ifDevelopment({
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /node_modules/
      }), ifDevelopment({
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext'
            }
          }
        }, {
          loader: 'angular2-template-loader'
        }, {
          loader: 'angular-router-loader'
        }],
        exclude: /node_modules/
      }, {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      }), {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }, {
        test: /(node_modules).+\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }, {
        test: /demos[\/\\].+\.(css|html)$/,
        loader: 'raw-loader'
      }, {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }])
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
      stats: {
        warningsFilter: /export '\w+' was not found in 'calendar-utils'/
      },
      clientLogLevel: 'error',
      overlay: true
    },
    plugins: removeEmpty([
      ifDevelopment(new ForkTsCheckerWebpackPlugin({
        watch: ['./src', './demos'],
        formatter: 'codeframe'
      })),
      ifDevelopment(new webpack.HotModuleReplacementPlugin()),
      ifProduction(new webpack.optimize.ModuleConcatenationPlugin()),
      ifProduction(new AotPlugin({
        tsConfigPath: './tsconfig-demos.json'
      })),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      }),
      ifProduction(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })),
      ifDevelopment(new StyleLintPlugin({
        syntax: 'scss',
        context: 'scss'
      })),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        __dirname + '/demos'
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        async: true,
        minChunks: 2
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'demos', 'index.ejs')
      }),
      ifProduction(new OfflinePlugin())
    ])
  }
};
