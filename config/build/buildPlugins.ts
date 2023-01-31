import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import {BuildOptions} from "./types/config";

export function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        // плагин для обработки html файлов, без него html не будет собираться, также он подключает скрипты в html
        new HtmlWebpackPlugin({
            // путь исходной директории (входная точка приложения), это файл будет использоваться как шаблон для сборки
            template: paths.html
        }),
        // плагин для отслеживания времени сборки
        new webpack.ProgressPlugin(),
    ]
}
