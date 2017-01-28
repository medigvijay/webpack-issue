var webpack = require("webpack");
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');


const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const extractCSS = new ExtractTextPlugin("app.bundle.css");

var config = {
	entry: SRC_DIR + "/app/index.js",
	output: {
		path: DIST_DIR + "/app",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				include: SRC_DIR,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['react', 'es2015']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				include: SRC_DIR,
				exclude: /(node_modules)/,
				loader: ExtractTextPlugin.extract({
			      fallbackLoader: "style-loader",
			      loader: "sass-loader",
			      publicPath: "/dist"
			    })
			}
		]
	},
	plugins: [
		extractCSS
	]
};

module.exports = config