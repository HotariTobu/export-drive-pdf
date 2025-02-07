const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        'download': './src/download.ts',
    },
    output: {
        clean: true,
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    stats: {
        all: false,
        errors: true,
        builtAt: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: 'public',
                },
            ],
        }),
    ],
};
