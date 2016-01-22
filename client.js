var BMP = require('bmp085');
var sensor = new BMP();
var udp = require('dgram');
var socket = udp.createSocket('udp4');

setInterval(function () {
  sensor.read(function (data) {
    var msg = new Buffer(JSON.stringify(data) + '\n');
    socket.send(msg, 0, msg.length, process.argv[2], process.argv[3], function (err) {
      if (err) {
        console.error('\n' + err.stack);
      } else {
        process.stdout('.');
      }
    });
  });
}, process.argv[4] || 5000);
