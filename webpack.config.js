// webpack.config.js

module.exports = {
  // the main entry of our app
  entry: ['./src/index.js', './src/auth/api.js'],
  // output configuration
  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: 'build.js'
  },

  module: {
    loaders: [
      // process *.vue files using vue-loader
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(jpg|png|gif)$/,
        loader: "file-loader?name=images/[hash].[ext]"
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }

    ]
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devtool: '#source-map'
}