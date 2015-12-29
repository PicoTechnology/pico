const exec = require('child_process').exec;
const path = require('path');

module.exports = {
	play: function(songpath) {
		console.log(`Now playing ${path.basename(songpath)}...`)
		var ext = path.extname(songpath);
		switch (ext) {
			case '.wav':
				exec(`aplay ${songpath}`);
				break;
			default:
				exec(`mpg123 ${songpath}`);
				break;
		}
	}
};
