import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import {BuildOptions} from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

export function buildPlugins({paths, isDev, apiUrl, project}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    // плагин для обработки html файлов, без него html не будет собираться, также он подключает скрипты в html
    new HtmlWebpackPlugin({
      // путь исходной директории (входная точка приложения), это файл будет использоваться как шаблон для сборки
      template: paths.html
    }),
    // плагин для отслеживания времени сборки
    new webpack.ProgressPlugin(),
    // позволяет прокидывать в приложение глобальные переменные (например, нам нужно isDev)
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),
  ]

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin())
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new BundleAnalyzerPlugin({
      // чтобы не открывался автоматически каждый раз при сборке
      openAnalyzer: false,
    }))
    plugins.push(new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }))
    plugins.push(new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }))
  }

  if (!isDev) {
    plugins.push(
      // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
      new MiniCssExtractPlugin({
        // названия файлов и где они будут располагаться
        filename: 'css/[name].[contenthash:8].css',
        // для асинхронных файлов
        chunkFilename: 'css/[name].[contenthash:8].css'
      }),
    )
    plugins.push(
      new CopyPlugin({
        patterns: [
          {from: paths.locales, to: paths.buildLocales},
        ],
      }),
    )
  }

  return plugins
}
