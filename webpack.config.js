const path = require('path')

module.exports = {
  entry: './src/scripts/full.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.min.js'
  },
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(png)$/,
        use:[
          'url-loader',
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  }
}