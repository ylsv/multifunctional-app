import {BuildOptions} from './types/config'
import webpack from 'webpack'
import {buildPlugins} from './buildPlugins'
import {buildLoaders} from './buildLoaders'
import {buildResolvers} from './buildResolvers'
import {buildDevServer} from './buildDevServer'

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const {paths, mode, isDev} = options

  return {
    // mode может быть development/production - в зависимости от выбора будет собран обычный или минимизированный файл
    mode,
    // стартовая точка приложения
    // path нужен для унификации названий путей, т.к. на разных операционных системах пути могут работать по-разному
    // __dirname - это корень, папка, в которой находимся на данный момент
    entry: paths.entry,
    // настройка аутпута (куда и как делаем сборку приложения)
    output: {
      // хэш для того чтобы браузер не кэшировал аутпут файл, и при пересборке пользователю отдавался обновленный файл
      // [] нужны для задания динамических названий файлов (шаблонизирование)
      filename: '[name].[contenthash].js',
      path: paths.build,
      // подчищаем файлы после каждой сборки
      clean: true,
      publicPath: '/',
    },
    plugins: buildPlugins(options),
    module: {
      // одно из важнейших полей. тут конфигурируем лоудеры (обрабатывают файлы, которые выходят за рамки js)
      // любые файлы как png, css, scss тут обрабатываются
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    // сорс-мап для нормального отслеживания мест происхождения ошибок в коде
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
