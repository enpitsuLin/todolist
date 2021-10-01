const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
	mode: "production",

	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		new CleanWebpackPlugin()
	]
});
