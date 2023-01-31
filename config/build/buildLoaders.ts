import webpack from "webpack";

export function buildLoaders(): webpack.RuleSetRule[] {

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    // здесь порядок лоудеров имеет значение
    return [
        // лоудер для ts - обрабатывает ts и tsx
        typescriptLoader,
    ]
}
