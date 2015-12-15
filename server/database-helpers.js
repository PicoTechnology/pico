const Firebase = require('firebase');
const FIREBASE_LOCATION = 'https://picotechnology.firebaseio.com/';
const USERS_LOCATION = 'https://picotechnology.firebaseio.com/users';
const PLAYLISTS_LOCATION = 'https://picotechnology.firebaseio.com/playlists';

var FirebaseRef;
var UsersRef;
var PlaylistsRef;

const connectToDB = () => {
	FirebaseRef = new Firebase(FIREBASE_LOCATION);
	UsersRef = FirebaseRef.child('users');
	PlaylistsRef = FirebaseRef.child('playlists');
};

const addUser = (req, res, next) => {
	var userObj = req.body;
	var result = checkExistingUser(userObj, username => {
		console.log(`result: ${result}`);
		if (!result) {
			UsersRef.set({ [username]: userObj});
			res.result = 'Added new user.';
			return next();
		}
		res.result = result;
		return next();
	});
};

const checkExistingUser = (userObj, userExistsCb) => {
	var UsersRef = new Firebase(USERS_LOCATION);
	var username = userObj.username;
	UsersRef
		.child(username)
		.once('value', snapshot => {
			var exists = (snapshot.val() !== null);
			userExistsCb(username);
		});
};

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
			next();
		});
};

const addToPlaylist = (req, res, next) => {
	var playlistname = req.params.playlistname;
	var trackID = req.body.trackID;
	console.log(`adding ${trackID} to ${playlistname}`);
	PlaylistsRef
		.child(playlistname)
		.child(trackID)
		.set(trackID,
			err => {
				if(err) {
					res.err = err;
					return next();
				}
				next();
			});
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
			next();
		});
};

const deleteSongFromPlaylist = (req, res, next) => {
	var playlistname = req.params.playlistname;
	var trackID = req.params.trackID;
	console.log(`playlistname: ${playlistname}`);
	console.log(`trackID: ${trackID}`);
	PlaylistsRef
		.child(playlistname)
		.orderByValue()
		.on('child_added', snapshot => {
			console.log('inside of here!');
			console.log(`snapshot.val(): ${snapshot.val()}`);
			if (snapshot.val() == trackID) {
				console.log('MATCHED!');
				snapshot.ref().remove(err => {
					if (err) res.err = err;
					return next();
				});
			}
		});
		// no match found
		res.err = 'No match found!';
		next();
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

const getTracksFromPlaylist = (req, res, next) => {
	var playlistname = req.params.playlistname;
	PlaylistsRef
		.child(playlistname)
		.once('value', snapshot => {
			res.data = snapshot.val();
			next();
		});
};

const API = {
	connectToDB,
	addPlaylist,
	addToPlaylist,
	addUser,
	checkExistingUser,
	deletePlaylist,
	deleteSongFromPlaylist,
	getPlaylists,
	getTracksFromPlaylist
};

module.exports = API;
