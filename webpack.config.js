module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'es6Jq.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
};