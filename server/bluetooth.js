const btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

module.exports = {
	startListening: () => {
		console.log('Listening for bluetooth...');
		btSerial.on('found', function(address, name) {
		  console.log('Found a device! Now looking for a serial port channel...');
		  btSerial.findSerialPortChannel(address, function(channel) {
		  	console.log('Trying to connect to serial port...');
	      btSerial.connect(address, channel, function() {
          console.log('Successfully connected to device serial port!');

          btSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
            if (err) console.log(err);
          });

          btSerial.on('data', function(buffer) {
            console.log(buffer.toString('utf-8'));
          });

		      }, () => {
		          console.log('cannot connect');
		      });
		  }, () => {
		      console.log('found nothing');
		  });
		});
	},
	beginSearch: () => {
		console.log('Inquiring...');
		btSerial.inquire();
	},
	closeConnection: () => {
		// close the connection when you're ready
    console.log('Closing bluetooth connection.');
    btSerial.close();
	}
};