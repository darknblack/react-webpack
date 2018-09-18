const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const BrotliPlugin = require('brotli-webpack-plugin');
const commonPaths = require('./paths');

const compression =
	process.env.COMPRESSION && process.env.COMPRESSION === 'true';

module.exports = {
	mode: 'production',
	output: {
		filename: `${commonPaths.jsFolder}/[name].[hash].js`,
		path: commonPaths.outputPath,
		chunkFilename: '[name].[chunkhash].js',
	},
	module: {
		rules: [
			{
				test: /\.(css|scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							sourceMap: true,
							modules: true,
							localIdentName: '[local]',
						},
					},
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin([commonPaths.outputPath.split('/').pop()], {
			root: commonPaths.root,
		}),

		new MiniCssExtractPlugin({
			filename: `${commonPaths.cssFolder}/[name].css`,
			chunkFilename: '[id].css',
		}),

		new UglifyJSPlugin(),

		!compression
			? null
			: new OptimizeCssAssetsPlugin({
					assetNameRegExp: /\.css$/g,
					cssProcessor: cssnano,
					cssProcessorOptions: { discardComments: { removeAll: true } },
					canPrint: true,
			  }),
		!compression ? null : new CompressionPlugin({ algorithm: 'gzip' }),
		!compression ? null : new BrotliPlugin(),
	].filter(Boolean),

	devtool: compression ? false : 'source-map',
};
