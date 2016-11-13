import path from 'path';

export default {
    context: `${__dirname}/src`,
    devServer: {
        contentBase: './build',
        hot: true,
    },
    devtool: 'eval-source-map',
    entry:   'main.jsx',
    output:  {
        path:       `${__dirname}/build`,
        publicPath: '/assets/',
        filename:   'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.styl$|\.css$/,
                include: [
                    path.resolve(__dirname, 'src/styles'),
                    path.resolve(__dirname, 'src/components'),
                ],
                loader: 'style!css!postcss?sourceMap=inline!stylus',
            },
        ],
    },
    resolve: {
        root: path.resolve(__dirname, 'src'),
    },
    watch: true,
};
