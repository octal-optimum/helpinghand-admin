const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development', // Ensure you're in development mode for React Refresh
  entry: './src/index.js', // Update this to your actual entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                require.resolve('react-refresh/babel'),
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
    },
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true, // Enable hot module replacement
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
  },
};
