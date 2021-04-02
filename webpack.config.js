const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    script: './src/script.ts',
    sw: './src/sw.ts',
    styles: './src/styles.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
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
        use: [
          { loader: 'file-loader', options: { name: '[name].css' } },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
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
