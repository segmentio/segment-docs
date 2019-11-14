const path = require('path');

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
