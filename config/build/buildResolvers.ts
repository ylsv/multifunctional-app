import webpack from 'webpack'
import {BuildOptions} from './types/config'

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
  return {
    // указываем расширения файлов, для которых при импорте не будем указывать эти расширения
    extensions: ['.tsx', '.ts', '.js'],
    // настраиваем абсолютные импорты
    preferAbsolute: true,
    // указываем модули, к которым будем обращаться по абсолютным импортам
    modules: [options.paths.src, 'node_modules'],
    // главные файлы для каждого модуля
    mainFiles: ['index'],
    // знак, который будет ставиться перед абсолютным импортом (в нашем случае ничего не указываем)
    alias: {},
  }
}
