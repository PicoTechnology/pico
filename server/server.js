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

app.get('/connect', playbackHelpers.playBloop, (req, res, next) => {
  console.log('Successfully connected to Pico. Welcome!');
  res.send({numUsers: 3});
});

app.post('/disconnect', dbHelpers.logoutUser, (req, res, next) => {
  if (res.err) return res.send(res.err);
  res.send(res.data);
});

app.get('/partyplaylist', (req, res, next) => {
  res.data = res.data[0];
  res.send(res.data);
});

app.post('/playsong', (req, res, next) => {
  var trackObj = req.body;
  var uri = trackObj.id;
  var queryString = qs.stringify(Object.assign({}, {client_id}));
  var downloadLink = `${SOUNDCLOUD_API}/tracks/${uri}/download?${queryString}`
  console.log(`download link: ${downloadLink}`);

  playbackHelpers.streamSong(downloadLink);
  res.send({status: 'playing'});
});

app.get('/playsong', (req, res, next) => {
  playbackHelpers.playSong();
  res.send({status: 'playing'});
});

app.get('/nextsong', dbHelpers.getNextSong, (req, res, next) => {
  var trackObj = res.data[0].soundcloud;
  res.send(res.data[0]);
  console.log(`trackID: ${trackObj.id}`);
  req.params.trackID = trackObj.id;
  dbHelpers.deleteSongFromPartyPlaylist(req, res, next);
});

app.get('/pausesong', (req, res, next) => {
  playbackHelpers.pauseSong();
  res.send({status: 'paused'});
});

app.get('/stopsong', (req, res, next) => {
  playbackHelpers.stopSong();
  res.send({status: 'stop'});
});

app.post('/users', dbHelpers.authenticateUser, (req, res, next) => {
  return res.send(res.result);
});

app.post('/signup', dbHelpers.addUser, (req, res, next) => {
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
console.log(`Connected to Firebase...`);
playbackHelpers.initPlayer();
console.log(`Initialized MPlayer...`);
// bluetooth
//bluetoothHelpers.initializeBluetooth();
