# Socket Test Application
### (Game Closure SDK)
Version 1.0.1

## Overview:
This project is a minimal implementation that helps demonstrate how to use [Game Closure's](http://www.gameclosure.com/) sockets library. The library works in a **native environment only** (i.e. Don't try to simulate it in a browser expecting the socket to connect).

In order to run a dummy server to communicate with the application, we recommend using [Node.js](http://nodejs.org/) which is already a prerequisite to run [Game Closure SDK](http://www.gameclosure.com/), however, another maybe simpler option we present is to run the SocketTest application

## Setup:
#### GC Application
In order to run this project, you should:

+ Download and install [Game Closure SDK](http://www.gameclosure.com/).
+ Download the [GCSockets project](https://github.com/Mazyod/GCSockets) into Game Closure SDK directory (devkit folder).
+ Register the GCSockets application by:
	+ Opening terminal
	+ `cd` into GCSockets application directory.
	+ Run `basil register` to register the application.
+ Open the `Application.js` file inside the project, and plug in your `IP_ADDRESS`.
+ You can either run the project on your device using the TestApp ([iOS](http://docs.gameclosure.com/native/ios-test-app.html) / [Android](http://docs.gameclosure.com/native/android-test-app.html)) or Native Build ([iOS](http://docs.gameclosure.com/native/ios-build.html) / [Android](http://docs.gameclosure.com/native/android-build.html)).

#### Server

I am still shocked how simple it is:

+ Create a `GCServer.js` file somewhere nice and comfy.
+ Put the following code inside **and change the IP address to your local IP**:

```js
// Simple Node.js TCP server that echoes whatever it receives
// Courtesy of Nodejs.org

var net = require('net');

var server = net.createServer (function (socket) {
  console.log ('Client Connected');
  socket.write ('Echo server\r\n');
  socket.on ('data', function (data) {
    console.log ('Server received: ' + data);	
    var status = socket.write (data.toString("utf8"));
    console.log ('Sending status: ' + status);
  });
});

// IMPORTANT: Please plug in your local network IP address
server.listen (8338, '10.10.13.11');

console.log ('listening at 10.10.13.11:8338');

```

+ Open terminal, and run the command `node GCServer.js`.
