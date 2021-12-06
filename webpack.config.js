const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');


module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'docs.bundle.js',
        path: path.join(__dirname, 'src', 'assets'),
    },
    resolve: {
        alias: {
            'analytics': path.resolve('analytics')
        }
    },
    plugins: [
        new DotenvPlugin({
          sample: './.env.example',
          path: './.env',
          allowEmptyValues: true,
        })
      ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                },
            },
        ],
    },
};
