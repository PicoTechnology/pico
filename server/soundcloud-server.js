'use strict';
const SoundCloud_Cred = require('./credentials.js');
const SOUNDCLOUD_API = 'https=//api.soundcloud.com';

SC.initialize({
  client_id: SoundCloud_Cred.client_id,
  redirect_uri: 'http://localhost:8000/callback'
});

SC.connect().then(()=> SC.put())
