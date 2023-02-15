import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // для css модулей
      {
        loader: 'css-loader',
        options: {
          modules: {
            // с помощью этого свойства определяем, для каких файлов применяем модули, для каких нет
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            // свойство для того, чтобы в дев сборке были обычные названия классов, а в проде сгенерированные
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },
      // Compiles Sass to CSS
      'sass-loader',
    ],
  }
}
