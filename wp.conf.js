var path = require("path"),
	webpack = require("webpack");

function config() {
	return {
		entry: {
			application: "./src/scripts/application",
			settings: "./src/scripts/settings.js",
			vendor: ["lodash"]
		},
		output: {
			path: path.join(__dirname, "public/assets"),
			filename: "[name].js",
			publicPath: "/assets/"

		}, 
		module: {
			loaders: [
				{ test: /\.js/, loader: "babel", exclude: /node_modules/ },
				{ test: /\.scss/, loader: "style!css!sass" },
				{ test: /\.css/, loader: "style!css" },
				{ test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)/, loader: "url-loader?limit1024" }
			]
		},

		plugins: [
			new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
		]
	};
}

module.exports = config();
module.exports.clone = config;