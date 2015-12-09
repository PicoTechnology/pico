'use strict';
const SC = require('node-soundcloud');
const SoundCloudCred = require('./credentials.js');
const serverHelpers = require('./server-helpers.js');
const dbHelpers = require('./database-helpers.js');
const qs = require('querystring');
const app = require('express')();
const fetch = require('node-fetch');
const bodyparser = require('body-parser');

const SOUNDCLOUD = 'https://soundcloud.com';
const SOUNDCLOUD_API = 'https://api.soundcloud.com';
const PORT = process.env.PORT || 8000;


app.use(bodyparser.json());
app.use(serverHelpers.printRequestInfo);

const client_id = SoundCloudCred.client_id;

const credentials = {
  client_id,
  redirect_uri: `localhost:${PORT}/callback`,
  scope: '*',
  response_type: 'code'
};

app.post('/users', dbHelpers.addUser, (req, res, next) => {
  if (res.result === -1) {
    return res.send(`Error adding user to database...`);
  }
  return res.send(`Successfully added: ${res.result}`);
});

app.get('/connect', (req, res, next) => {
  SC.init({
    id: client_id,
    secret: SoundCloudCred.client_secret,
    uri: `http://localhost:${PORT}/callback`
  });
  const url = SC.getConnectUrl();
  console.log(url);
  fetch(url)
    .then(response => response.text())
    .then(body => res.send(body))
    .catch(err => res.send('error connecting to SoundCloud API.'))
});

app.post('/tracks', (req, res, next) => {
  // req.body = {
  //   query: 'string value here'
  // };
  req.body.query;
  console.log(`req.body: ${JSON.stringify(req.body, null, 2)}`)
  console.log(`${SOUNDCLOUD_API}/tracks?${qs.stringify(Object.assign({}, req.body, {client_id}))}`);
  fetch(`${SOUNDCLOUD_API}/tracks?${qs.stringify(Object.assign({}, req.body, {client_id}))}`)
    .then(response => response.json())
    .then(json => {
      console.log(json);
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