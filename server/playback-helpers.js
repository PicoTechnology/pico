const exec = require('child_process').exec;
const path = require('path');
const MPlayer = require('mplayer');
var player;

module.exports = {
	initPlayer: function() {
		player = new MPlayer();
	},
	play: function(songpath) {
		console.log(`Now playing ${path.basename(songpath)}...`)
		// var ext = path.extname(songpath);
		// switch (ext) {
		// 	case '.wav':
		// 		exec(`aplay ${songpath}`);
		// 		break;
		// 	default:
		// 		exec(`mpg123 ${songpath}`);
		// 		break;
		// }
	},
	streamSong: function(downloadLink) {
		console.log('streaming song...');
		player.openFile(downloadLink);
	}
};
