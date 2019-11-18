import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';

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
  loading: {
    color: '#fff'
  },
  server: {
    port: 8080,
    host: 'localhost'
  },

  vue: {
    config: {
      productionTip: false
    }
  },

  // plugins to load before mounting the app
  plugins: [],

  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  axios: {
    proxy: true,
    retry: {
      retries: 0
    },
    debug: false
  },

  proxy: {
    '/api/': 'http://localhost:4000',
    '/img/': 'http://localhost:4000'
  },

  build: {
    postcss: {
      syntax: 'postcss-scss',
      plugins: {
        'postcss-import': {},
        'postcss-normalize': {},
        'postcss-strip-inline-comments': {},
        'postcss-simple-extend': {},
        'postcss-simple-vars': {},
        'postcss-momentum-scrolling': {},
        'postcss-easings': {},
        'postcss-easing-gradients': {},
        'postcss-color-mod-function': {}
      },
      // postcss-preset-env config options
      preset: {
        stage: 2,
        autoprefixer: {
          grid: false
        }
      }
    },

    // extend webpack config
    plugins: [
      new StyleLintPlugin({
        files: '**/*.*{css,vue}',
        configOverrides: {
          defaultSeverity: 'warning'
        },
        failOnError: false,
        failOnWarning: false
      })
    ],

    // style-resources-module did not seem to work; use
    // sass-resource-loader as a workaround
    extend(config, ctx) {
      // 4 corresponds to the test for /\.p(ost)?css$/i
      // sass-resource-loader goes right after postcss-loader (array positioning)
      config.module.rules[4].oneOf.forEach(item => {
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

      // enable auto-fix for eslint-loader
      config.module.rules.push({
        enforce: 'pre', // checks source files not modified by other loaders (ex. bable-loader)
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true,
          emitError: false,
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      });
    }
  }
};
