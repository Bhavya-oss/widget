module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'postcss-import': {},
    'postcss-nested': {},
    'autoprefixer': {},
    'cssnano': {},
    '@fullhuman/postcss-purgecss': {
      content: ['./layouts/*/.html', './content/*/.md', './static/*/.js'],
    },
  },
};