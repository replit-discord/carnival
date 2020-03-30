import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const isDev = process.env.NODE_ENV !== 'production';

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

  css: ['~/assets/global.css', ...(isDev ? ['~/assets/dev.css'] : [])],

  // plugins to load before mounting the app
  plugins: [],

  buildModules: [
    [
      '@nuxtjs/proxy',
      {
        axios: {
          proxy: true,
          retry: {
            retries: 0
          },
          debug: false
        }
      }
    ],
    '@nuxtjs/axios'
    // eslint-module seems to ignore the failOnError and
    // failOnWarning keys. because build fails on simple
    // rules, we are disabling this until issue has been fixed
    // [
    //   '@nuxtjs/eslint-module',
    //   {
    //     fix: true,
    //     failOnError: false,
    //     failOnWarning: false,
    //     emitError: true,
    //     emitWarning: true,
    //     cache: true
    //     // eslint options (https://github.com/nuxt/eslint-config/blob/33a724d6bc0058e3048b41bde1f026f8760d9fb6/packages/eslint-config/index.js#L48 is somehow noe being uesd)
    //     // overriding these rules is a workaround
    //     // rules: {
    //     //   'no-console': 'off',
    //     //   'no-debugger': 'off'
    //     // }
    //   }
    // ]
  ],

  // TODO: move to under buildModules
  proxy: {
    '/public/': 'http://localhost:4000',
    '/api/': 'http://localhost:4000',
    '/graphql/': 'http://localhost:4000'
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
        fix: true,
        emitError: false,
        emitWarning: true,
        failOnError: false,
        failOnWarning: false
      })
    ],

    // @nuxtjs/style-resources module did not seem to work; use
    // sass-resource-loader as a workaround
    extend(config, ctx) {
      const sassResourceLoader = {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.join(__dirname, 'assets/open-color.css'),
            path.join(__dirname, 'assets/custom.css')
          ]
        }
      };
      // 4 corresponds to the test for /\.p(ost)?css$/i
      // sass-resource-loader goes right after postcss-loader (array positioning)
      config.module.rules[4].oneOf.forEach(item => {
        item.use.push(sassResourceLoader);
      });

      // 3 corresponds to the test for /\.css$/i
      // sass-resource-loader goes right after postcss-loader (array positioning
      config.module.rules[3].oneOf.forEach(item => {
        item.use.push(sassResourceLoader);
      });
    }
  }
};
