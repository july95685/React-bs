const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const config = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/src/app.js')
  ],

  output: {
    path: path.join(__dirname, 'client/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],


  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.s?css$/,
      include: [
        path.resolve(__dirname, 'client/src/components'),
        path.resolve(__dirname, 'client/src/layouts')
      ],
      loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader'
    }, {
      test: /\.s?css$/,
      exclude: [
        path.resolve(__dirname, 'client/src/components'),
        path.resolve(__dirname, 'client/src/layouts')
      ],
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  }
}

module.exports = config