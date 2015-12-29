const Firebase = require('firebase');
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
	var userObj = req.body;
	var username = userObj.username;
	UsersRef
		.child(username)
		.set(userObj, err => {
			if (err) {
				res.err = err;
				return next();
			}
			res.result = 'Added new user.';
			return next();
		});
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
			res.result = {result: true};
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
	var playlistname = req.params.playlistname;
	var trackObj = req.body.trackObj;
	console.log(`adding ${trackObj.id} to ${playlistname}...`);
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
	console.log(`req.body.trackObj: ${JSON.stringify(req.body.trackObj, null, 2)}`);
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
	console.log(`playlistname: ${playlistname}`);
	console.log(`trackID: ${trackID}`);
	PlaylistsRef
		.child(playlistname)
		.orderByValue()
		.on('child_added', snapshot => {
			// console.log('inside of here!');
			// console.log(`snapshot.key(): ${snapshot.key()}`);
			if (snapshot.key() == trackID) {
				console.log('MATCHED!');
				snapshot.ref().set(null, err => {
					if (err) {
						res.err = err;
						return next();
					}
					console.log(trackID, ' removed from ', playlistname);
					res.data = playlistname;
					console.log('res.data is ', res.data);
					return next();
				});
			}
		});
		// no match found
		res.err = 'No match found!';
		return next();
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
			console.log("insdie get playlists dbhelper");
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
			res.data = exportArr;
			console.log(`exportArr: ${JSON.stringify(exportArr, null, 2)}`);
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
	addToPartyPlaylist,
	addUser,
	authenticateUser,
	deletePlaylist,
	deleteSongFromPlaylist,
	getPlaylists,
	getPartyPlaylist,
	getTracksFromPlaylist
};

module.exports = API;
