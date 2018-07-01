var path = require('path');
module.exports = {
    entry: './src/loader/csharploader.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'jsharp.js',
        path: path.resolve(__dirname, 'dist')
    }
};
//# sourceMappingURL=webpack.config.js.map