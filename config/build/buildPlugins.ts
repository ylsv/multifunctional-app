import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import {BuildOptions} from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

export function buildPlugins({paths, isDev, apiUrl}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    // плагин для обработки html файлов, без него html не будет собираться, также он подключает скрипты в html
    new HtmlWebpackPlugin({
      // путь исходной директории (входная точка приложения), это файл будет использоваться как шаблон для сборки
      template: paths.html
    }),
    // плагин для отслеживания времени сборки
    new webpack.ProgressPlugin(),
    // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
    new MiniCssExtractPlugin({
      // названия файлов и где они будут располагаться
      filename: 'css/[name].[contenthash:8].css',
      // для асинхронных файлов
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    // позволяет прокидывать в приложение глобальные переменные (например, нам нужно isDev)
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
    }),
  ]

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push( new BundleAnalyzerPlugin({
      // чтобы не открывался автоматически каждый раз при сборке
      openAnalyzer: false,
    }))
  }

  return plugins
}
