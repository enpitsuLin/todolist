const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = merge(baseWebpackConfig, {
	mode: "development",
	devServer: {
		compress: true,
		port: 2333
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		new HotModuleReplacementPlugin()
	]
});
