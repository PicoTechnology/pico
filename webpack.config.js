module.exports = {
	entry: './browser/app/components/Main.js',
	output: {
		filename: './browser/public/bundle.js'
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['react']}}
		]
	}
};