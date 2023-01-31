import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
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
