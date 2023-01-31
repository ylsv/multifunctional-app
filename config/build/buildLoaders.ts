import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // для css модулей
            {
                loader: "css-loader",
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
            "sass-loader",
        ],
    }

    // если не истользуем тайпскрипт, нужен babel-loader. но нам пока не нужен
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    // здесь порядок лоудеров имеет значение
    return [
        // лоудер для ts - обрабатывает ts и tsx
        typescriptLoader,
        // лоудер для css, sass
        cssLoader,
    ]
}
