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

const addPlaylist = (playlistObj) => {
	var playlistName = playlistObj.name;
	PlaylistsRef
		.push({[playlistName]: []});
};

const addToPlaylist = (playlistname, trackID) => {
	PlaylistsRef
		.child(playlistname)
		.push(trackID);
};

const deletePlaylist = (playlistName) => {
	PlaylistsRef
		.child(playlistname)
		.remove();
};

const deleteSongFromPlaylist = (playlistname, trackID) => {
	PlaylistsRef
		.child(playlistname)
		.child(trackID)
		.remove();
};

const getPlaylists = () => {
		PlaylistsRef
			.orderByKey()
			.once('value', dataSnapshot => {
				dataSnapshot.forEach( snapshot => {
					var playlistName = snapshot.key();
					var playlistTracks = snapshot.child();
				});
			});
};

const API = {
	connectToDB,
	addUser,
	checkExistingUser,
	deletePlaylist,
	deleteSongFromPlaylist,
	getPlaylists
};

module.exports = API;
