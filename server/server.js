'use strict';
const SC = require('node-soundcloud');
const SoundCloudCred = require('./credentials.js');
const SOUNDCLOUD_API = 'https://soundcloud.com';
const serverHelpers = require('./server-helpers.js');
const qs = require('querystring');
const app = require('express')();
const fetch = require('node-fetch');

const PORT = 8000;
app.use(serverHelpers.printRequestInfo);

SC.init({
  id: SoundCloudCred.client_id,
  secret: SoundCloudCred.client_secret,
  uri: `http://localhost:${PORT}/callback`
});

app.get('/connex', (req, res, next) => {
  const url = SC.getConnectUrl();
  console.log(url);
  fetch(url)
    .then(response => response.text())
    .then(body => console.log(body)
  );
  // res.writeHead(301, {Location: "http://google.com"});
  // res.end();
});

app.listen(PORT);
console.log(`Now listening on localhost:${PORT}...`);
