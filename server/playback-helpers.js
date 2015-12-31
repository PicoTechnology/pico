const exec = require('child_process').exec;
const path = require('path');
const MPlayer = require('mplayer');

const SOUND_ASSETS = `${__dirname}/assets`;

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
	playBloop: function(req, res, next) {
		var player2 = new MPlayer();
		player2.on('stop', () => next());
		player2.openFile(`${SOUND_ASSETS}/bloop.mp3`);
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
