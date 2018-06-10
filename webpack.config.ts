import * as path from 'path';
import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as StyleLintPlugin from 'stylelint-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as OfflinePlugin from 'offline-plugin';
import * as FilterWarningsPlugin from 'webpack-filter-warnings-plugin';

export default (env = 'development') => {
  const { ifProduction, ifDevelopment } = getIfUtils(env);

  return {
    mode: env,
    entry: path.join(__dirname, 'demos', 'entry.ts'),
    output: {
      path: __dirname,
      filename: ifProduction('[name]-[chunkhash].js', '[name].js')
    },
    module: {
      rules: removeEmpty([
        ifDevelopment({
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /node_modules/
        }),
        ifDevelopment(
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  compilerOptions: {
                    module: 'esnext'
                  }
                }
              },
              {
                loader: 'angular2-template-loader'
              },
              {
                loader: 'angular-router-loader'
              }
            ],
            exclude: /node_modules/
          },
          {
            test: /\.ts$/,
            loader: '@ngtools/webpack'
          }
        ),
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /(node_modules).+\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        {
          test: /demos[\/\\].+\.(css|html)$/,
          loader: 'raw-loader'
        },
        {
          test: /node_modules\/@angular\/core\/.+\/core\.js$/,
          parser: {
            system: true // disable `System.import() is deprecated and will be removed soon. Use import() instead.` warning
          }
        }
      ])
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        'angular-calendar$': path.resolve(__dirname, 'src/index.ts'),
        'angular-calendar/calendar-utils/date-fns$': path.resolve(
          __dirname,
          'src/calendar-utils/date-fns.ts'
        ),
        'angular-calendar/calendar-utils/moment$': path.resolve(
          __dirname,
          'src/calendar-utils/moment.ts'
        )
      }
    },
    devServer: {
      port: 8000,
      inline: true,
      hot: true,
      historyApiFallback: true,
      overlay: true
    },
    plugins: removeEmpty([
      new FilterWarningsPlugin({
        exclude: /export '\w+'.* was not found in/
      }),
      ifDevelopment(
        new ForkTsCheckerWebpackPlugin({
          watch: ['./src', './demos'],
          formatter: 'codeframe'
        })
      ),
      ifDevelopment(new webpack.HotModuleReplacementPlugin()),
      ifProduction(
        new AngularCompilerPlugin({
          tsConfigPath: './tsconfig-demos.json',
          sourceMap: true
        })
      ),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      }),
      ifDevelopment(
        new StyleLintPlugin({
          syntax: 'scss',
          context: 'scss'
        })
      ),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)fesm5/,
        __dirname + '/demos'
      ),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'demos', 'index.ejs'),
        chunksSortMode: 'none'
      }),
      ifProduction(new OfflinePlugin())
    ]),
    optimization: {
      splitChunks: ifProduction(
        {
          chunks: 'all',
          automaticNameDelimiter: '.'
        },
        false
      ),
      runtimeChunk: ifProduction(true, false),
      noEmitOnErrors: ifProduction(true, false),
      removeAvailableModules: ifProduction(true, false), // disable tree shaking in dev mode for faster rebuilds
      removeEmptyChunks: ifProduction(true, false)
    }
  };
};
