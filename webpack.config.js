module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
   module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      },
      { 
        test: /\.ttf$/, 
        loader: 'url-loader?limit=100000' 
      },
      { 
        test: /\.md$/, 
        loader: 'html-loader!markdown-loader' 
      }
    ]
  }
};