const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "js/bundle.[hash].js"
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loaders: {},
					transformAssetUrls: {
						"v-img": "src"
					}
				}
			},
			{
				test: /\.(jpeg|jpg|png|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							fallback: "file-loader",
							name: "[name].[ext]",
							limit: 2048,
							outputPath: "./img",
							publicPath: "./img",
							esModule: false
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.s(c|a)ss$/,
				use: [
					"vue-style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
							sassOptions: {
								fiber: require("fibers"),
								indentedSyntax: true // optional
							}
						}
					}
				]
			}
		]
	},
	plugins: [new VueLoaderPlugin()],
	resolve: {
		alias: {
			"@": path.resolve("src"),
			vue: "vue/dist/vue.js"
		}
	}
};
