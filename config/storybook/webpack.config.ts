import webpack, {DefinePlugin, RuleSetRule} from 'webpack'
import {BuildPaths} from '../build/types/config'
import path from 'path'
import {buildCssLoader} from '../build/loaders/buildCssLoader'

export default ({config}: {config: webpack.Configuration}) => {
  // расширяем конфиг вебпака для нормальной работы сторибука
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }
  config.resolve.modules.push(paths.src)
  config.resolve.extensions.push('.ts', '.tsx')
  // находим в конфиге вебпака по регулярке правило, обрабатывающее svg, и исключаем обработку этого правила для сторибука
  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if(/svg/.test(rule.test as string)) {
      return {...rule, exclude: /\.svg$/i}
    }
    return rule
  })
  // переопределяем правило для svg
  config.module.rules.push({
    test: /\.svg$/i,
    use: ['@svgr/webpack'],
  })
  config.module.rules.push(buildCssLoader(true))
  config.plugins.push(new DefinePlugin({
    __IS_DEV__: true,
    __API__: JSON.stringify(''),
  }))
  return config
}
