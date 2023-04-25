import webpack, {DefinePlugin, RuleSetRule} from 'webpack'
import {BuildPaths} from '../build/types/config'
import path from 'path'
import {buildCssLoader} from '../build/loaders/buildCssLoader'

export default ({config}: { config: webpack.Configuration }) => {
  // расширяем конфиг вебпака для нормальной работы сторибука
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: path.resolve(__dirname, '..', '..', 'public', 'locales'),
    buildLocales: path.resolve(__dirname, '..', '..', 'build', 'locales')
  }
  config.resolve!.modules!.push(paths.src)
  config.resolve!.extensions!.push('.ts', '.tsx')
  // находим в конфиге вебпака по регулярке правило, обрабатывающее svg, и исключаем обработку этого правила для сторибука
  const rules = config.module!.rules as RuleSetRule[]
  config.module!.rules = rules.map((rule) => {
    if (/svg/.test(rule.test as string)) {
      return {...rule, exclude: /\.svg$/i}
    }
    return rule
  })
  // переопределяем правило для svg
  config.module!.rules.push({
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
  })
  config.module!.rules.push(buildCssLoader(true))
  config.plugins!.push(new DefinePlugin({
    __IS_DEV__: true,
    __API__: JSON.stringify(''),
    __PROJECT__: JSON.stringify('storybook'),
  }))
  return config
}
