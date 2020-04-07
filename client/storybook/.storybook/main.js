let path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: (config, { configType }) => {
    const isDev = configType === 'DEVELOPMENT';

    // this is later put at end of css and postcss
    let sassResourceLoader = {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          // from sass-resource-loader
          path.join(__dirname, '../../assets/open-color.css'),
          path.join(__dirname, '../../assets/custom.css'),
          path.join(__dirname, '../../assets/text-crop-sen.scss'),
          path.join(__dirname, '../../assets/text-crop-asap.scss'),
          // nuxt global 'css'
          // a little little dirty, but less harmful because this
          // duplicated css doesn't get served to direct users
          path.join(__dirname, '../../assets/global.css'),
          ...(isDev ? [path.join(__dirname, '../../assets/custom.css')] : [])
        ]
      }
    };

    // doesn't work
    // config.entry.push(path.join(__dirname, '../assets/global.css'));
    // if (configType === 'DEVELOPMENT') {
    //   config.entry.push(path.join(__dirname, '../assets/dev.css'));
    // }

    //
    // add sass-resources-loader to css rule
    let cssRule;
    for (let rule of config.module.rules) {
      if (rule.test.toString() === /\.css$/.toString()) {
        cssRule = rule;
      }
    }
    cssRule.use.push(sassResourceLoader);

    //
    // add postcss rule
    let postcssConfig = require('../../postcss.configuration');
    let loadPlugins = loader => {
      let postcssPlugins = [];

      // add plugins found in
      // some.postcss.configuration.js
      for (let pluginName in postcssConfig.plugins) {
        postcssPlugins.push(
          require(pluginName)(postcssConfig.plugins[pluginName])
        );
      }
      // special case because postcss-preset-env
      // automatically included by nuxt
      postcssPlugins.push(
        // let module = require.resolve('postcss-preset-env', {
        //   paths:
        // })
        require('postcss-preset-env')({
          ...postcssConfig.preset
        })
      );

      return postcssPlugins;
    };

    let postcssRule = {
      test: /\.postcss$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: cssRule.use[1].options },
        {
          loader: 'postcss-loader',
          options: {
            syntax: postcssConfig.syntax,
            plugins: loader => loadPlugins(loader)
          }
        }
      ]
    };
    postcssRule.use.push(sassResourceLoader);
    config.module.rules.push(postcssRule);

    //
    // because we are in a nested subdirectory of the actual project,
    // we have to resolve our dependencies properly (just in case as
    // node looks to parent directories if modules cannot be found)
    config.resolve.modules.push(path.join(__dirname, '../../node_modules'));

    //
    // alias so we can access parent directory's source easier
    // and so nuxt alias works in storybook
    config.resolve.alias['~'] = path.join(__dirname, '../../');

    // console.dir(config, { depth: null });

    const htmlWebpackPlugin = config.plugins[1];
    if (!htmlWebpackPlugin.options.meta)
      throw new Error('htmlWebapckPlugin not in expected location');
    htmlWebpackPlugin.options.meta.link = [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Asap&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Sen&display=swap'
      }
    ];
    return config;
  }
};
