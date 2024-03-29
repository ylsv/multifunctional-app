import {BuildOptions} from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderProps extends BuildOptions {
  isTSX?: boolean
}

export function buildBabelLoader({isDev, isTSX}: BuildBabelLoaderProps) {
  return {
    test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: [
          ['@babel/plugin-transform-typescript', {isTSX}],
          ['@babel/plugin-transform-runtime'],
          isTSX && !isDev && [
            babelRemovePropsPlugin,
            {props: ['data-testid']}
          ],
          isDev && require.resolve('react-refresh/babel'),
        ].filter(Boolean),
      },
    },
  }
}
