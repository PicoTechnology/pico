'use strict';

const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');

const credentials = require('./credentials.js');

const PORT = 8000;

const SPOTIFY_ACCOUNTS = 'https://accounts.spotify.com';
const SPOTIFY_API = 'https://api.spotify.com/v1/me';
const STATE_KEY = 'spotify_auth_state';
const REDIRECT_URI = 'http://localhost:8000/callback';

const app = require('express')();

const serverHelpers = require('./server-helpers.js');

// middleware
app.use(cookieParser());
app.use(serverHelpers.printRequestInfo);
app.use(serverHelpers.printUserIP);
app.use(serverHelpers.printRequestHeaders);

const generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// from Spotify's GitHub authorization example
app.get('/login', (req, res, next) => {
	let state = generateRandomString(16);
	res.cookie(STATE_KEY, state);

	// your application requests authorization
	let scope = 'user-read-private user-read-email';
	fetch(`${SPOTIFY_ACCOUNTS}/authorize?` +
		querystring.stringify({
			response_type: 'code',
			client_id: credentials.client_id,
			scope,
			redirect_uri: REDIRECT_URI,
			state
		}));
});

// callback fires after return from /login
app.get('/callback', (req, res, next) => {
	// your application requests refresh and access tokens
	// after checking the state parameter
	let code = req.query.code || null;
	let state = req.query.state || null;
	let storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storeState) {
		let data = {error: 'state_mismatch'};
		return res.send(data);
	}
	res.clearCookie(STATE_KEY);
	let authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code,
			redirect_uri: REDIRECT_URI,
			grant
		}
	};

});

// step 1. mobile device POSTs to /authenticate endpoint
app.post('/authenticate', (req, res, next) => {
	let scopes = 'user-read-private user-read-email';
	// receive user information as an object
	// pass along to Spotify API

	// start authentication process
	// get user's authorization to access data
	fetch(`${SPOTIFY_ACCOUNTS}/authorize`)
		.then(res => res.json())
		.then(json => {
			// send this back to mobile device for consent
			console.log('-- /authenticate --');
			console.log(JSON.stringify(json, null, 2));
			res.send(json);
		});
});

// step 2. mobile device POSTs consent to have application
// access his or her data
app.post('/authenticate/consent', (req, res, next) => {
	// make sure that req.body has necessary data
	// (i.e. authorization code and client secret)
	// pass to this endpoint the authorization code returned
	// by the first call; also add the client_secret_key
	fetch(`${SPOTIFY_ACCOUNTS}/api/token`, {
			method: 'post',
			body: req.body
		})
		.then(res => res.json())
		.then(json => {
			console.log('-- /authenticate/consent --');
			console.log(JSON.stringify(json, null, 2));
			res.send(json);
		});
});

// step 3. the third call is to get a refresh_token to keep the
// authorized session open
app.post('/authenticate/consent/refresh', (req, res, next) => {
	fetch(`${SPOTIFY_API}`)
		.then(res => {
			console.log(JSON.stringify(res, null, 2));
			console.log('Time to refresh the access token!');
			res.send('Refreshing access token...');
		});
});

app.get('/', (req, res, next) => {
	res.send('Hello World');
});

app.listen(PORT);
console.log(`Now listening on ${PORT}...`);
console.log(`${JSON.stringify(credentials, null, 2)}`);
