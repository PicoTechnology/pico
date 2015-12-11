const Firebase = require('firebase');
const FIREBASE_LOCATION = 'https://picotechnology.firebaseio.com/';
const USERS_LOCATION = 'https://picotechnology.firebaseio.com/users';
const PLAYLISTS_LOCATION = 'https://picotechnology.firebaseio.com/playlists';

var FirebaseRef;
var UsersRef;
var PlaylistsRef;

const connectToDB = () => {
	FirebaseRef = new Firebase(FIREBASE_LOCATION);
	UsersRef = FirebaseRef.child(USERS_LOCATION);
	PlaylistsRef = FirebaseRef.child(PLAYLISTS_LOCATION);
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

const API = {
	connectToDB,
	addUser,
	checkExistingUser
};

module.exports = API;
