// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');

module.exports = {
    plugins: [
      new ExtractTextPlugin("theme.css", {allChunks:true}),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                include: [
                    SRC_PATH,
                    STORIES_PATH
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                include: SRC_PATH
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                include: SRC_PATH
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:[
                  {
                    loader:"css-loader",
                    options: {
                      sourceMap:true,
                      minimize:true,
                      importLoaders:2
                    }
                  },
                  {
                    loader:"postcss-loader"
                  },
                  {
                    loader:"sass-loader",
                    options:{sourceMap:true}
                  }
                ]

              }),
              include: path.join(__dirname, '../theming')
            },
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        enforceExtension: false
    }
};
