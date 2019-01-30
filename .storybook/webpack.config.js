module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]]
        }
      }
    ]
  }
}
