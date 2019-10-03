'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        
        path.join(__dirname, './src/index.js')
    ],
    devServer: {
    	allowedHosts: ['.us-west-1.compute.amazonaws.com'],
	disableHostCheck: true,
	port: 3000
    },
    target: 'node',
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["@babel/env", "@babel/react"],
                    "plugins": [
                        [
                            "@babel/plugin-proposal-class-properties",
                            {
                                "loose": true
                            }
                        ]
                    ],
                }
            },
            {
            	test: /\.css$/,
		use: extractTextPlugin.extract({
	        fallback: 'style-loader',
	        use: [
	            {
	       		    loader: 'css-loader',
	        	    options: {
	                	   modules: true,
	                    	   localIdentName: '[path][name]_[local]--[hash:base64:8]',
	            	    },
	            },
	            {
	                loader: 'postcss-loader',
	                options: { plugins: () => [ nested(), autoprefixer(), values] },
	            }
	        ]
	    	}),
	    	exclude: [...]
            }
        ]
    },
};
