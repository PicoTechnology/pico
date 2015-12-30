const exec = require('child_process').exec;
const path = require('path');
const MPlayer = require('mplayer');
var player;

module.exports = {
	initPlayer: function() {
		player = new MPlayer();
		// register events
		player.on('start', () => console.log('Now playing...'));
		player.on('play', () => console.log('Resuming playback...'));
		player.on('pause', () => console.log('Playback paused.'));
		player.on('stop', () => console.log('Playback stopped.'));
		//player.on('status', () => console.log('Something happened. Refreshing subscribed devices'));
		// player.on('time', time => console.log(`"time": ${time}`));
	},
	playSong: function(songpath) {
		player.play();
	},
	pauseSong: function() {
		player.pause();
	},
	stopSong: function() {
		player.stop();
	},
	streamSong: function(downloadLink) {
		console.log('streaming song...');
		player.openFile(downloadLink);
	}
};
