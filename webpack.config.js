const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    script: './src/script.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new BitBarWebpackProgressPlugin()],
};
