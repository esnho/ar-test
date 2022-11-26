const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const watch = process.env.WATCH === 'true' ? true : false;
const production = process.env.PRODUCTION === 'true' ? true : false;
const templateIndex = path.join(__dirname, './public/index.html');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  mode: production ? 'production' : 'development',
  devtool: production ? undefined : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.hdr$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
          test: /\.(glb|gltf)$/,
          use:
          [
              {
                  loader: 'file-loader',
                  options:
                  {
                      outputPath: 'assets/models/'
                  }
              }
          ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: templateIndex,
      filename: "./index.html",
      "chunksSortMode": "none",
      inject: "body",
      publicPath: "./"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    })
  ],
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  devServer: {
    static: './public',
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;