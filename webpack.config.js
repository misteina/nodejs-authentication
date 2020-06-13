const path = require('path');

module.exports = {
    mode: 'development',
    entry: './react/App.js',
    output: {
        filename: 'ui.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};