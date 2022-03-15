/**
 * @type webpack
 */
const path = require('path');
const pkgs = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WEBPACK_SERVE = !!process.env.WEBPACK_SERVE;
const join = path.join;
const mode = WEBPACK_SERVE ? 'development' : 'production';

const config = {
  target: 'web',
  mode: mode,
  entry: './src/index.ts',
  optimization: {
    runtimeChunk: 'single',
    minimize: false
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    publicPath: `auto`,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    allowedHosts: 'all',
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 8080,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],  // js必须存在，对node_modules有影响
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg|gif|bmp)/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/inline',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开发环境下开启 babel 缓存
              presets: ['babel-preset-solid']
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // 打包编译不会进行类型检查, 使用ForkTsCheckerWebpackPlugin
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      cache: true,
      version: pkgs.version,
    }),
  ],
};

module.exports = config