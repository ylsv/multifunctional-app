import webpack from "webpack";

export function buildResolvers(): webpack.ResolveOptions {
    return {
        // указываем расширения файлов, для которых при импорте не будем указывать эти расширения
        extensions: ['.tsx', '.ts', '.js'],
    }
}
