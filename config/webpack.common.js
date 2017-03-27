/**
 * @author: @AngularClass
 */

var webpack = require('webpack');
var helpers = require('./helpers');

/**
 * Webpack Plugins
 */
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

/**
 * Webpack Constants
 */
const METADATA = {
  title: 'Testing Angular 2 applications with Protractor & CucumberJS',
  baseUrl: '/'
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
  // Cache generated modules and chunks to improve performance for multiple incremental builds.
  // This is enabled by default in watch mode.
  // You can pass false to disable it.
  //
  // See: http://webpack.github.io/docs/configuration.html#cache
  // cache: false,

  // The entry point for the bundle
  // Our Angular.js app
  //
  // See: http://webpack.github.io/docs/configuration.html#entry
  entry: {

    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.browser.ts'
  },

  // Options affecting the resolving of modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {

    // An array of extensions that should be used to resolve modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
    extensions: ['', '.ts', '.js'],

    // remove other default values
    modules: [helpers.root('src'), 'node_modules']

  },

  // Options affecting the normal modules.
  //
  // See: http://webpack.github.io/docs/configuration.html#module
  module: {

    // An array of automatically applied loaders.
    //
    // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
    // This means they are not resolved relative to the configuration file.
    //
    // See: http://webpack.github.io/docs/configuration.html#module-loaders
    rules: [
      // Tslint loader support for *.ts files
      //
      // See: https://github.com/wbuchwalter/tslint-loader
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },

      // Source map loader support for *.js files
      // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
      //
      // See: https://github.com/webpack/source-map-loader
      {
        test: /\.js$/,
        enforce: "pre",
        loader: 'source-map-loader'
      },

      // Typescript loader support for .ts and Angular 2 async routes via .async.ts
      //
      // See: https://github.com/s-panferov/awesome-typescript-loader
      {
        test: /\.ts$/,
        use: [{loader: 'awesome-typescript-loader'}],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },

      // Raw loader support for *.css files
      // Returns file content as string
      //
      // See: https://github.com/webpack/raw-loader
      {
        test: /\.css$/,
        use: [{loader: 'raw-loader'}]
      },

      // Support for SCSS
      // To string loader support for *.scss files
      // Css loader support for *.scss files
      // Post css loader for *.scss files
      // Sass loader for *.scss files
      // Returns file content as string
      {
        test: /\.scss$/,
        exclude: helpers.root('node_modules'),
        use: [{loader: 'to-string-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
      },

      // Raw loader support for *.html
      // Returns file content as string
      //
      // See: https://github.com/webpack/raw-loader
      {
        test: /\.html$/,
        use: [{loader: 'raw-loader'}],
        exclude: [
          helpers.root('src/index.html')
        ]
      },

      {
        test: /\.(jpg|png|gif)$/,
        use: [{loader: "file-loader"}],
        exclude: [helpers.root('node_modules')]
      },

      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        use: {
          loader: "url",
          options: {
            limit: 10000
          }
        }
      }
    ]
  },

  // Add additional plugins to the compiler.
  //
  // See: http://webpack.github.io/docs/configuration.html#plugins
  plugins: [

    // Plugin: ForkCheckerPlugin
    // Description: Do type checking in a separate process, so webpack don't need to wait.
    //
    // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
    new CheckerPlugin(),

    // Plugin: CommonsChunkPlugin
    // Description: Shares common code between the pages.
    // It identifies common modules and put them into a commons chunk.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(['polyfills', 'vendor', 'main']),
      minChunks: Infinity
    }),

    // Plugin: CopyWebpackPlugin
    // Description: Copy files and directories in webpack.
    //
    // Copies project static assets.
    //
    // See: https://www.npmjs.com/package/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    // Plugin: HtmlWebpackPlugin
    // Description: Simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that include a hash in the filename
    // which changes every compilation.
    //
    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'main'])
    })
  ],

  // Include polyfills or mocks for various node stuff
  // Description: Node configuration
  //
  // See: https://webpack.github.io/docs/configuration.html#node
  node: {
    global: 'true',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
