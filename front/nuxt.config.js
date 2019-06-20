import path from 'path';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-simple-vars': {}
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: false
        }
      },
      loaderOptions: {}
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // 6 corresponds to the test for /\.p(ost)?css$/i
      config.module.rules[6].oneOf.forEach(item => {
        // sass-resource-loader goes right after postcss-loader (array positioning)
        item.use.push({
          loader: 'sass-resources-loader',
          options: {
            resources: path.join(__dirname, 'assets/open-color.css')
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
