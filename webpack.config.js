const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// webpack v4
const path = require('path');
module.exports = {
  entry: [
    './src/js/index.js',
    './src/scss/base.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
                outputPath: '/dist/img/'
            }
        }],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src/pug'),
        loader: 'pug-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/base.css'),
    new HtmlWebpackPlugin({
      template: './src/pug/index.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'landing.html',
      template: './src/pug/landing_page.pug'
    }),
  ]
};