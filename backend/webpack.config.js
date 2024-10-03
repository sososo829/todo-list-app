const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/server.ts', // Your entry point
  target: 'node', // Specify that you are building for Node.js
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // Resolve these extensions
  },
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  devtool: 'source-map', // Optional: for easier debugging
};
