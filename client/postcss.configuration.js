// this not named postcss.config.js
// so it doesn't automatically get picked up
// by anything used by nuxt etc. nuxt
// recommends not creating a postcss config

// this is more specific to nuxt
// than to postcss (ex. use of hoisting
// preset key to root rather than
// as an option to the plugin itself is
// nuxt )
module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    'postcss-import': {},
    'postcss-normalize': {},
    'postcss-strip-inline-comments': {},
    'postcss-simple-extend': {},
    'postcss-simple-vars': {},
    'postcss-easings': {},
    'postcss-easing-gradients': {},
    'postcss-color-mod-function': {}
  },
  // postcss-preset-env config options
  preset: {
    stage: 1,
    autoprefixer: {
      grid: false
    }
  }
};
