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
	var username = userObj.username;
	UsersRef
		.child(username)
		.set(userObj);
		res.result = 'Added new user.';
		return next();
};

const authenticateUser = (req, res, next) => {
	var userObj = req.body;
	var username = userObj.username;
	var password = userObj.password;
	UsersRef
		.once('value', snapshot => {
			var userExists = snapshot.hasChild(username);
			console.log('check if user exists: ', userExists);
			if(!userExists){
				res.result = {result: false};
				return next();
			}
			var storedPW =
				snapshot
					.child(username + "/password")
					.val();
			console.log('stored password is ', storedPW);
			console.log('checking pw match?', storedPW === password );
			if(storedPW !== password){
				console.log('password not match!');
				res.result = {result: false};
				return next();
			}
			console.log('user and password passed');
			res.result = {result: true};
			console.log('Result is', res.result);
			return next();
		});
}

const addPlaylist = (req, res, next) => {
  console.log(`req.body: ${JSON.stringify(req.body, null, 2)}`);
	var playlistname = req.body.playlistname;
	var trackIDs = req.body.trackIDs;
	PlaylistsRef
		.child(playlistname)
		.set(trackIDs, err => {
			if(err) {
        console.log('err!!');
				res.err = err;
				return next();
			}
      console.log('no err...');
			return next();
		});
};

const addToPlaylist = (req, res, next) => {
  console.log(`req.body: ${JSON.stringify(req.body, null, 2)}`);
	var playlistname = req.params.playlistname;
	var trackObj = req.body.trackObj;
	console.log(`adding ${trackObj.id} to ${playlistname}`);
	PlaylistsRef
		.child(playlistname)
		.child(trackObj.id)
		.set(trackObj,
			err => {
				if(err) {
					res.err = err;
					return next();
				} else {
					// assigns to res.data
					getPlaylists(req, res, next);
				}
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
					if (err) {
						res.err = err;
						return next();
					}
					getPlaylists(req, res, next);
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
	authenticateUser,
	deletePlaylist,
	deleteSongFromPlaylist,
	getPlaylists,
	getTracksFromPlaylist
};

module.exports = API;
