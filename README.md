# Socket Test Application
### (Game Closure SDK)
Version 1.0.1

## Overview:
This project is a minimal implementation that helps demonstrate how to use [Game Closure's](http://www.gameclosure.com/) sockets library. The library works in a **native environment only (preferably Android)** (i.e. Don't try to simulate it in a browser expecting the socket to connect).

In order to run a dummy server to communicate with the application, we recommend using [Node.js](http://nodejs.org/) which is already a prerequisite to run [Game Closure SDK](http://www.gameclosure.com/). Another possible option is to use the GUI Java socket app [SocketTest3](sockettest.sourceforge.net), but it won't be covered in the scope of this document.

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

#### Node.js Server

I am still shocked how simple it is:

+ Create a `GCServer.js` file somewhere nice and comfy.
+ Put the following code inside **and change the IP address to your local IP**:

```js
// Simple Node.js TCP server that echoes whatever it receives
// Courtesy of Nodejs.org

var net = require('net');

var server = net.createServer(function (socket) {
    console.log('Client Connected');
    socket.write('Echo server\r\n');

    socket.on('data', function (data) {
        console.log('Server received: ' + data);	
    
        var status = socket.write(data + '\r\n');
        console.log('Sending status: ' + status);
    });
});

// IMPORTANT: Please plug in your local network IP address
var IP_ADDRESS = '10.10.13.11';
var port = 8338;

server.listen (port, IP_ADDRESS);

console.log ('listening at ' + IP_ADDRESS + ':' + port);

```

+ Open terminal and navigate to the `GCServer.js` file's directory.
+ Run the command `node GCServer.js`.

Hopefully, you'll see the log print `listening at ...`.<br /> 
If you get an error saying: `Error: listen EADDRNOTAVAIL`, then you probably haven't configured the IP address properly.

Last, but not least, **make sure both your mobile device and PC are connected to the same local network**.

## Running the Application:

OK, so after you have set everything up, you should have Node.js TCP server running on your local network through terminal, and a GC application deployed on your native device, with both devices connected to the same WiFi network.

Now, go ahead and launch the GCSocets application. You should be presented with either of the following, depending on whether you set up your server's IP or not:

![Screenshot1](http://i1129.photobucket.com/albums/m509/mazyod/download2.png)
![Screenshot2](http://i1129.photobucket.com/albums/m509/mazyod/download3.png)

Now, keeping your eyes on the Node server and device logs, you can start using the app by pressing "Connect" to connect to the server, "Send Data" to send some dummy data that will be echoed back, and finally "Disconnect" to terminate the session.

[img1]: http://i1129.photobucket.com/albums/m509/mazyod/download.png

