import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"
import {BuildOptions} from "./types/config"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

export function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
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
      __IS__DEV__: JSON.stringify(isDev),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
