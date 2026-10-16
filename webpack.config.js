import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'dotenv/config';
import { env } from './src/env/env.ts';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/index.ts', 
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
     extensions: ['.ts', '.js'],
  extensionAlias: {
    '.js': ['.ts', '.js'],
  },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', 
    }),
      new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
 }),
  ],
  devServer: {
    static: './dist',
    port: 3000, 
    open: true, 
    hot: true,  
    proxy: [
    {
      context: ['/foursquare-api'],
      target: 'https://places-api.foursquare.com',
      pathRewrite: { '^/foursquare-api': '' },
      changeOrigin: true,
    }
  ],
  },
};