const Firebase = require('firebase');
var FirebaseRef;
var UsersRef;


const connectToDB = () => {
	FirebaseRef = new Firebase('https://picotechnology.firebaseio.com/');
	UsersRef = FirebaseRef.child('users');
};

const addUser = (req, res, next) => {
	var userObj = req.body;
	var result = checkExistingUser(userObj);
	if (!result) {
		var newUserRef = UsersRef.push(userObj);
		newUserRef.setPriority(1000);
		res.result = 'Added new user.';
		return next();
	}
	res.result = result;
	return next();
};

const checkExistingUser = (userObj) => {
	// might need to call setPriority(..) when adding user
	UsersRef
		.startAt(userObj.username)
		.endAt(userObj.username)
		.once('value', snapshot => {
			if (snapshot) {
				return snapshot.val();
			}
			return null;
		});
};

const API = {
	connectToDB,
	addUser,
	checkExistingUser
};

module.exports = API;