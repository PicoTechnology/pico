// const SpotifyWebApi = require('spotify-web-api-node');

// const credentials = require('./credentials.js');

// // credentials
// const spotifyApi = new SpotifyWebApi({
// 	clientId: credentials.client_id,
// 	clientSecret: credentials.client_secret,
// 	redirectUri: ''
// });

const PORT = 8888;
const app = require('express')();

app.get('/', (req, res, next) => {
	res.send('Hello World');
});

app.listen(PORT);
console.log(`Now listening on ${PORT}...`);