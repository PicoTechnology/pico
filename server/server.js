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

const Speaker = require('speaker');
const lame = require('lame');
const wav = require('wav');
const Player = require('player');

const dbHelpers = require('./database-helpers.js');
const bluetoothHelpers = require('./bluetooth.js');


const SOUNDCLOUD = 'https://soundcloud.com';
const SOUNDCLOUD_API = 'http://api.soundcloud.com';
const PORT = process.env.PORT || 8000;

app.use(serverHelpers.printRequestInfo);

app.use(bodyparser.json());

const client_id = SoundCloudCred.client_id;

app.get('/connect', (req, res, next) => {
  console.log('Searching for bluetooth devices...');

  bluetoothHelpers.beginSearch();

  res.send({a: 'pizza'});
});

app.get('/disconnect', (req, res, next) => {
  bluetoothHelpers.closeConnection();
});

app.get('/testplay', (req, res, next) => {
  var file = fs.createReadStream(`${__dirname}/assets/piano2.wav`);
  var reader = new wav.Reader();

  reader.on('format', format => {
    reader.pipe(new Speaker(format));
  });

  file.pipe(reader);
});

app.post('/playsong', (req, res, next) => {
  var uri = req.body.id;
  var queryString = qs.stringify(Object.assign({}, {client_id}));
  console.log(`${SOUNDCLOUD_API}/tracks/${uri}/download?${queryString}`);

  var mp3File = fs.createWriteStream(`${__dirname}/assets/a.mp3`);
  var wavFile = fs.createWriteStream(`${__dirname}/assets/b.wav`);

  var decoder = new lame.Decoder();

  decoder.on('format', format => {
    var writer = new wav.Writer(format);

    decoder
      .pipe(writer)
      .pipe(wavFile);
    console.log('inside decoder...');

    // when file closes, play to speakers
    wavFile.on('close', () => {
      console.log('wavFile closed!');
      var file2 = fs.createReadStream(`${__dirname}/assets/b.wav`);

      // send data to speakers
      var reader = new wav.Reader();

      reader.on('format', format => {
        reader.pipe(new Speaker(format));
      });

      file2.pipe(reader);
    });

  });

  request
    .get(`${SOUNDCLOUD_API}/tracks/${uri}/download?${queryString}`)
    .on('error', err => console.error(err))
    .pipe(decoder)

});

app.post('/users', dbHelpers.addUser, (req, res, next) => {
  if (res.result === -1) {
    return res.send(`Error adding user to database...`);
  }
  return res.send(`Successfully added: ${res.result}`);
});

app.post('/tracks', (req, res, next) => {
  console.log(`req.body: ${JSON.stringify(req.body, null, 2)}`)
  fetch(`${SOUNDCLOUD_API}/tracks?${qs.stringify(Object.assign({}, req.body, {client_id}))}`)
    .then(response => response.json())
    .then(json => {
      json = json.filter(song => {
        return song.downloadable;
      })
      console.log(json);
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
bluetoothHelpers.startListening();