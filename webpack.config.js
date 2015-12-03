module.exports = {
	entry: './QueueTests.js',
	output: {
		filename: './compiled/bundle.js'
	},
	module: {
		loaders: [
			{test: '/\.jsx?$/', exclude: /(node_modules|bower_components)/, loader: 'babel'}
		]
	}
};