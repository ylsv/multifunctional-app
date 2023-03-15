import webpack from 'webpack'
import {BuildOptions} from './types/config'
import {buildCssLoader} from './loaders/buildCssLoader'
import {buildBabelLoader} from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const {isDev} = options
  // обрабатываем импорты svg
  const svgLoader = {
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
  }

  // обрабатываем импорты изображений других типов (также можно сюда добавить шрифты - woff ...)
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const babelLoader = buildBabelLoader(options)

  const cssLoader = buildCssLoader(isDev)

  // если не истользуем тайпскрипт, нужен babel-loader. но нам пока не нужен
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  // здесь порядок лоудеров имеет значение
  return [
    fileLoader,
    svgLoader,
    babelLoader,
    // лоудер для ts - обрабатывает ts и tsx
    typescriptLoader,
    // лоудер для css, sass
    cssLoader,
  ]
}
