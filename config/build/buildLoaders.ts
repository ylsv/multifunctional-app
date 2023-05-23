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

  const codeBabelLoader = buildBabelLoader({...options, isTSX: false})
  const tsxCodeBabelLoader = buildBabelLoader({...options, isTSX: true})

  const cssLoader = buildCssLoader(isDev)

  // здесь порядок лоудеров имеет значение
  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    // лоудер для css, sass
    cssLoader,
  ]
}
