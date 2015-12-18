# Contributing

If you are interested in contributing to this project, check out the CONTRIBUTING.md for workflow information.

### Technology

For Linux devices (e.g. Raspberry Pi) the Speaker module needs ALSA support.
Install the following on your Raspberry Pi device before starting the server:

```
$ sudo apt-get install libasound2-dev
```
For more information on this, follow this link: https://github.com/TooTallNate/node-speaker

###### Bluetooth Scanning

Make sure that you have `bluetoothctl` installed on your device. If so, run:

```
$ bluetoothctl
```

From here you can scan and discover bluetooth-enabled devices by their UUIDs. Run `help` from the bluetoothctl prompt for a list of all of the available commands. Once you have discovered your bluetooth speaker's UUID, run the `pair` command followed by its UUID.

```
[bluetooth]# pair XX:XX:XX:XX:XX:XX
```

Lastly, to verify whether or not the pairing was successful run `paired-devices` to receive a list of all successfully paired bluetooth devices.

Testing the connection

```
$ sudo l2ping -c 1 XX:XX:XX:XX:XX:XX
```

If the connection is good (i.e. no packet loss), play a song like so:
```
$ sudo mpg321 file-name.mp3
```

PulseAudio volume control
```
$ pavucontrol
```

```
$ mpg123 song-name.mp3
```

###### React Router
https://www.npmjs.com/package/react-router

###### Webpack
A substitute for Grunt / Gulp, Browserify and other workflow utilities. Webpack works fantastically with React and is endorsed by many React developers.
https://webpack.github.io/
```
# Run this command from your project root
$ webpack -w
```

###### React Hot Reloader
https://github.com/gaearon/react-hot-boilerplate

###### Redux (Reducer + Flux)
To facilitate state management, we will use Redux by Dan Abramov.

During development, check out the Redux DevTools
https://github.com/gaearon/redux-devtools

Here is an illuminating video by Dan Abramov talking about React Hot Reloader and the Redux project.
https://www.youtube.com/watch?v=xsSnOQynTHs

And for React Native, we will do our styling with the Flexbox
###### Flexbox Tutorials
Here is a playful, interactive resource to quickly introduce yourself to the Flexbox:
http://flexboxfroggy.com/
This resource is endorsed by Facebook as a graphic introduction to the Flexbox model:
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

###### Fetch API
https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en
Parts of the newer Fetch API have been ported to React-Native. So to make HTTP requests, in lieu of the more verbose XMLHttpRequest API, we will use the Fetch API. Here's an overview and a quick introduction to its syntax.

