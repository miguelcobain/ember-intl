'use strict';

const sideWatch = require('@embroider/broccoli-side-watch');
const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: [],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    trees: {
      app: sideWatch('app', {
        watching: ['../my-v2-addon/src'],
      }),
    },
  });

  const options = {
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              generator: {
                filename: '[path][name]-[hash][ext][query]',
              },
              test: /(node_modules\/\.embroider\/rewritten-app\/translations\/)(.*\.json)$/,
              type: 'asset/resource',
            },
          ],
        },
      },
    },
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    splitAtRoutes: [],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticComponents: true,
    staticEmberSource: true,
    staticHelpers: true,
    staticModifiers: true,
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
