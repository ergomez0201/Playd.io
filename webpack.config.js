const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': 'http://localhost:3000/',
      // headers: {
      //   Connection: 'keep-alive',
      // },
      // followRedirects: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
