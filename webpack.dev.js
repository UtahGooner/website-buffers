const {merge} = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const path = require('path');

const localProxy = {
    target: {
        host: 'localhost',
        protocol: 'http:',
        port: 8081
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: [
            {
                directory: path.join(process.cwd(), 'public'),
                watch: false,
            }
        ],
        hot: true,
        proxy: {
            '/api': {...localProxy},
            '/node_modules/': {...localProxy},
            '/node-chums/': {...localProxy},
            '/node-dev/': {...localProxy},
            '/node-sage/': {...localProxy},
            '/sage/': {...localProxy},
            '/version': {...localProxy},
        },
        historyApiFallback: {
            rewrites: [
                {from: /^apps\/website-buffers/, to: '/'}
            ]
        }
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
