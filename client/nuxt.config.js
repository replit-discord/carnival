import path from 'path';

export default {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Asap&display=swap'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // customize progress bar color
  loading: { color: '#fff' },

  // global css (we have no need for this since we have sass-resources-loader)
  css: [],

  // plugins to load before mounting the app
  plugins: [],

  // nuxtjs modules
  modules: [
    // docs: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module'
  ],

  // axios module config: https://axios.nuxtjs.org/options
  axios: {},

  build: {
    postcss: {
      plugins: {
        'postcss-simple-vars': {},
        'postcss-color-mod-function': {}
      },
      // update postcss-preset-env config
      preset: {
        autoprefixer: {
          grid: false
        }
      },
      loaderOptions: {}
    },

    // extend webpack config
    extend(config, ctx) {
      // 6 corresponds to the test for /\.p(ost)?css$/i
      config.module.rules[6].oneOf.forEach(item => {
        // sass-resource-loader goes right after postcss-loader (array positioning)
        item.use.push({
          loader: 'sass-resources-loader',
          options: {
            resources: [
              path.join(__dirname, 'assets/open-color.css'),
              path.join(__dirname, 'assets/custom.css')
            ]
          }
        });
      });

      //  enable auto-fix for eslint-loader
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true
        }
      });
    }
  }
};
