'use strict';
const SC = require('node-soundcloud');
const SoundCloudCred = require('./credentials.js');
const serverHelpers = require('./server-helpers.js');
const qs = require('querystring');
const fs = require('fs');
const app = require('express')();
const fetch = require('node-fetch');
const bodyparser = require('body-parser');
const request = require('request');
const path = require('path');
const execSync = require('child_process').execSync;

const lame = require('lame');
const wav = require('wav');

const dbHelpers = require('./database-helpers.js');
const playbackHelpers = require('./playback-helpers.js');

const SOUNDCLOUD = 'https://soundcloud.com';
const SOUNDCLOUD_API = 'http://api.soundcloud.com';
const PORT = process.env.PORT || 8000;

app.use(serverHelpers.printRequestInfo);

app.use(bodyparser.json());

const client_id = SoundCloudCred.client_id;

app.get('/connect', (req, res, next) => {
  console.log('Searching for bluetooth devices...');
  // bluetoothHelpers.beginSearch();

  res.send({numUsers: 3});
});

app.get('/disconnect', (req, res, next) => {
  //bluetoothHelpers.closeConnection();
});

app.post('/playsong', (req, res, next) => {
  var trackObj = req.body;
  var uri = trackObj.id;
  var queryString = qs.stringify(Object.assign({}, {client_id}));
  console.log(`download link: ${SOUNDCLOUD_API}/tracks/${uri}/download?${queryString}`);

  var songpath = `${__dirname}/assets/${trackObj.id}.${trackObj.original_format}`;
  var mp3File = fs.createWriteStream(songpath);
  mp3File.on('finish', () => {
    console.log(`finished downloading ${trackObj.title}`);
    playbackHelpers.play(songpath);
    res.send('finished downloading');
  });

  request
    .get(`${SOUNDCLOUD_API}/tracks/${uri}/download?${queryString}`)
    .on('error', err => console.error(err))
    .pipe(mp3File)
});

app.post('/users', dbHelpers.authenticateUser, (req, res, next) => {
  return res.send(res.result);
});

app.post('/playlists', dbHelpers.addPlaylist, (req, res, next) => {
  if (res.err) return res.send(`ERROR Server.js: ${res.err}`);
  res.send(`Successfully created playlist: ${req.body.playlistname}`);
});

app.post('/playlists/:playlistname', dbHelpers.addToPlaylist, (req, res, next) => {
  if (res.err) return res.send(`ERROR Server.js: ${res.err}`);
  // console.log(`After posting song, return:  ${JSON.stringify(res.data)}`);
  res.send(res.data);
});

// Retrieve the songs from the Party Playlist
app.get('/partyplaylist', dbHelpers.getPartyPlaylist, (req, res, next) => {
  res.send(res.data);
});

// add a song to the Party Playlist
app.post('/partyplaylist', dbHelpers.addToPartyPlaylist, (req, res, next) => {
  if (res.err) return res.send(`ERROR Server.js: ${res.err}`);
  res.send(res.data);
});

// upvote a song in Party Playlist
app.post('/partyplaylist/upvote/:trackID', dbHelpers.upvoteTrack, (req, res, next) => {
  if (res.err) return res.send(`ERROR Server.js: ${res.err}`);
  res.send(res.data);
});

// downvote a song in Party
app.post('/partyplaylist/downvote/:trackID', dbHelpers.downvoteTrack, (req, res, next) => {
  if (res.err) return res.send(`ERROR Server.js: ${res.err}`);
  res.send(res.data);
})

app.get('/playlists', dbHelpers.getPlaylists, (req, res, next) => {
  console.log('getting playlists');
  res.send(res.data);
});

app.get('/playlists/:playlistname', dbHelpers.getTracksFromPlaylist, (req, res, next) => {
  var playlistname = req.params.playlistname;
  // console.log(playlistname);
  res.send(res.data);
});

app.delete('/playlists/:playlistname', dbHelpers.deletePlaylist, (req,res, next) => {
  if (res.err) return res.send (`ERROR Server.js: ${res.err}`);
  res.send(`Successfully deleted playlist: ${req.params.playlistname}`);
});

app.delete('/playlists/:playlistname/:trackID', dbHelpers.deleteSongFromPlaylist, (req, res, next) => {
  if (res.err) {
    console.log('ERROR!');
    return res.send(`ERROR Server.js: ${res.err}`)
  };
  console.log(`Successfully deleted trackID: ${req.params.trackID} from playlist: ${req.params.playlistname}`);
  console.log(JSON.stringify(res.data, null, 2));
  console.log('sending back above');
  res.send(res.data);
});

app.post('/tracks', (req, res, next) => {
  // console.log(`req.body: ${JSON.stringify(req.body, null, 2)}`);
  fetch(`${SOUNDCLOUD_API}/tracks?${qs.stringify(Object.assign({}, req.body, {client_id}))}`)
    .then(response => response.json())
    .then(json => {
      json = json.filter(song => {
        return song.downloadable;
      })
      // console.log(json);
      console.log(`${SOUNDCLOUD_API}/tracks?${qs.stringify(Object.assign({}, req.body, {client_id}))}`);
      res.type('application/json');
      res.send(json);
    })
    .catch(err => res.send('Error, please enter a valid search query...'));
});

app.get('/authorize', (req, res, next) => {
  console.log(`user: ${JSON.stringify(user, null, 2)}`);
  let data = Object.assign({}, user);
  fetch(`${SOUNDCLOUD}/connect/login`, data)
    .then(res => res.json())
    .then(json => {
      console.log(json);
    });
});

app.listen(PORT);
console.log(`Now listening on localhost:${PORT}...`);
dbHelpers.connectToDB();

// bluetooth
//bluetoothHelpers.initializeBluetooth();
