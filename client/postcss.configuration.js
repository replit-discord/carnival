// this not named postcss.config.js
// so it doesn't automatically get picked up
// by anything used by nuxt etc. nuxt
// recommends not creating a postcss config

module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 1,
      autoprefixer: {
        grid: false
      }
    },
    'postcss-url': {},
    'postcss-normalize': {},
    'postcss-strip-inline-comments': {},
    'postcss-simple-extend': {},
    'postcss-simple-vars': {},
    'postcss-easings': {},
    'postcss-easing-gradients': {},
    'postcss-color-mod-function': {}
  }
};
