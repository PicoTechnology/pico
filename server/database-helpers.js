const Firebase = require('firebase');
const UX_HELPERS = require('../mobile/App/Utils/UxHelpers.js');
const FIREBASE_LOCATION = 'https://picotechnology.firebaseio.com/';

var FirebaseRef;
var UsersRef;
var PlaylistsRef;
var PartyPlaylistRef;

const connectToDB = () => {
	FirebaseRef = new Firebase(FIREBASE_LOCATION);
	UsersRef = FirebaseRef.child('users');
	PlaylistsRef = FirebaseRef.child('playlists');
	PartyPlaylistRef = FirebaseRef.child('partyplaylist');
};

const addUser = (req, res, next) => {
	var userObj = Object.assign({}, {online: true, signInAt: Firebase.ServerValue.TIMESTAMP}, req.body);
	var username = userObj.username;
	UsersRef
		.child(username)
		.set(userObj, err => {
			if (err) {
				res.result = {result: false};
				res.err = err;
				return next();
			}
			res.result = {result: true};
			return next();
		});
};

const getUsers = (req, res, next) => {
	UsersRef
		.orderByKey()
		.once('value', dataSnapshot => {
			var exportArr = [];
			dataSnapshot.forEach(user => {
				if (user.val().online) {
					exportArr.push(user.exportVal());
				}
			})
			res.data = exportArr;
			return next();
		});
};

const changeOnlineStatus = (username, newStatus) => {
	var status;
	UsersRef
		.child(`${username}/online`)
		.set(newStatus);
};

const logoutUser = (req, res, next) => {
	var userObj = req.body;
	var username = userObj.username;
	changeOnlineStatus(username, false);
	res.data = {status: false};
	next();
};

const authenticateUser = (req, res, next) => {
	var userObj = req.body;
	var username = userObj.username;
	var password = userObj.password;
	UsersRef
		.once('value', snapshot => {
			var userExists = snapshot.hasChild(username);
			if(!userExists){
				res.result = {result: false};
				return next();
			}
			var storedPW =
				snapshot
					.child(username + "/password")
					.val();
			if(storedPW !== password){
				res.result = {result: false};
				return next();
			}
			changeOnlineStatus(username, true);
			res.result = {result: true};
			return next();
		});
}

const addPlaylist = (req, res, next) => {
	var playlistname = req.body.playlistname;
	var trackIDs = req.body.trackIDs;
	PlaylistsRef
		.child(playlistname)
		.set(trackIDs, err => {
			if(err) {
				res.err = err;
				return next();
			}
			return next();
		});
};

const addToPlaylist = (req, res, next) => {
	var playlistname = req.params.playlistname;
	var trackObj = req.body.trackObj;
	PlaylistsRef
		.child(playlistname)
		.child(trackObj.id)
		.set(trackObj, err => {
				if(err) {
					res.err = err;
					return next();
				}
				// assigns to res.data
				getPlaylists(req, res, next);
			});
};

const addToPartyPlaylist = (req, res, next) => {
	var trackObj = Object.assign({rating: 0}, {soundcloud: req.body.trackObj});
	PartyPlaylistRef
		.child(trackObj.soundcloud.id)
		.set(trackObj, err => {
			if (err) {
				res.err = err;
				return next();
			}
			// getPartyPlaylist assigns to res.data
			getPartyPlaylist(req, res, next);
		});
};

// returns the song at the top of the Party Queue
const getNextSong = (req, res, next) => {
	getPartyPlaylist(req, res, next);
};

const deletePlaylist = (req, res, next) => {
	var playlistname = req.params.playlistname;
	PlaylistsRef
		.child(playlistname)
		.remove(err => {
			if (err) {
				res.err = err;
				return next();
			}
			return next();
		});
};

const deleteSongFromPlaylist = (req, res, next) => {
	var playlistname = req.params.playlistname;
	var trackID = req.params.trackID;
	PlaylistsRef
		.child(playlistname)
		.orderByValue()
		.on('child_added', snapshot => {
			if (snapshot.key() == trackID) {
				snapshot.ref().set(null, err => {
					if (err) {
						res.err = err;
						return next();
					}
					res.data = playlistname;
					return next();
				});
			}
		});
};

const deleteSongFromPartyPlaylist = (req, res, next) => {
	var trackID = req.params.trackID;
	PartyPlaylistRef
		.orderByValue()
		.on('child_added', snapshot => {
			if (snapshot.key() == trackID) {
				snapshot.ref().set(null, err => {
					if (err) {
						res.err = err;
						return next();
					}
					getPartyPlaylist(req, res, next);
				});
			}
		});
};

const getPlaylists = (req, res, next) => {
	PlaylistsRef
		.orderByKey()
		.once('value', dataSnapshot => {
			var exportArr = [];
			dataSnapshot.forEach(snapshot => {
				var obj = {};
				var playlist = [];
				for (var key in snapshot.exportVal()) {
					playlist.push(snapshot.exportVal()[key]);
				}
				obj[snapshot.key()] = playlist;
				exportArr.push(obj);
			});
			res.data = exportArr;
			next();
		});
};

const getPartyPlaylist = (req, res, next) => {
	PartyPlaylistRef
		.orderByKey()
		.once('value', dataSnapshot => {
			var exportArr = [];
			dataSnapshot.forEach(snapshot => {
				exportArr.push(snapshot.exportVal());
			});
			exportArr.sort((a, b) => {
				return b.rating - a.rating;
			});
			res.data = exportArr;
			next();
		});
};

const getTracksFromPlaylist = (req, res, next) => {
	var playlistname = req.params.playlistname;
	PlaylistsRef
		.child(playlistname)
		.once('value', snapshot => {
			res.data = snapshot.val();
			next();
		});
};

const upvoteTrack = (req, res, next) => {
	var trackID = req.params.trackID;
	PartyPlaylistRef
		.orderByValue()
		.on('child_added', snapshot => {
			if(snapshot.key() == trackID) {
				var val = snapshot.child('rating').val();
				var newVal = val + 1;
				var onComplete = err => {
					if(err) {
						res.err = err;
						next();
					}
					getPartyPlaylist(req, res, next);
				}
				snapshot.ref().update({rating: newVal}, onComplete);
			}
		});
}
const downvoteTrack = (req, res, next) => {
	var trackID = req.params.trackID;
	PartyPlaylistRef
		.orderByValue()
		.on('child_added', snapshot => {
			if(snapshot.key() == trackID) {
				var val = snapshot.child('rating').val();
				var newVal = val - 1;
				// if (Math.abs(newVal) >= UX_HELPERS.DOWNVOTE_THRESHOLD) {
				// 	req.params.playlistname = 'partyplaylist';
				// 	return deleteSongFromPlaylist(req, res, next);
				// }
				var onComplete = err => {
					if(err) {
						res.err = err;
						next();
					}
					getPartyPlaylist(req, res, next);
				}
				snapshot.ref().update({rating: newVal}, onComplete);
			}
		});
}

const API = {
	connectToDB,
	addPlaylist,
	addToPlaylist,
	addToPartyPlaylist,
	addUser,
	getUsers,
	logoutUser,
	authenticateUser,
	deletePlaylist,
	deleteSongFromPlaylist,
	deleteSongFromPartyPlaylist,
	getPlaylists,
	getNextSong,
	getPartyPlaylist,
	getTracksFromPlaylist,
	upvoteTrack,
	downvoteTrack
};

module.exports = API;
