/* @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with the Game Closure SDK.  If not, see <http://www.gnu.org/licenses/>.
 */

import ui.TextView as TextView;
import ui.View as View;
import ui.widget.ButtonView as ButtonView;

// IMPORTANT: Plug in your local IP address
var IP_ADDRESS = '';

exports = Class(GC.Application, function () {

	this.initUI = function () {
		// Make sure that the user has set his IP
		if (IP_ADDRESS === '') {
			new TextView({
				superview: this.view,
				layout: 'box',
				text: 'PLEASE ENTER YOUR IP THROUGH THE CODE!!',
				layoutWidth: '80%',
				layoutHeight: '100%',
				wrap: true,
				centerX: true,
				centerY: true,
				color: '#FFF',
				size: 40,
			});

			return;
		};
		// The view that encapsulates the menu buttons
		this.view.updateOpts({
			layoutWidth: '100%',
			layoutHeight: '100%',
			layout: 'linear',
			direction: 'vertical',
			justifyContent: 'space-outside'
		});
		// Simple buttons with their respective functionality
		var connectBtn = this._constructMenuButton('Connect', '#666666', connect.bind(this));
		var sendBtn = this._constructMenuButton('Send Data', '#888888', send.bind(this));
		var disconnectBtn = this._constructMenuButton('Disconnect', '#AAAAAA', disconnect.bind(this));
		// a logging area
		this.logArea = new TextView({
			superview: this.view,
			layoutWidth: '95%',
			layoutHeight: '40%',
			text: 'Press Connect to Start',
			color: '#FFF',
			wrap: true,
			size: 32
		});
	};
	// simple helper function to construct a button
	this._constructMenuButton = function (text, color, callback) {
		return new ButtonView({
			superview: this.view,
			title: text,
			backgroundColor: color,
			text: {
				color: '#FFFFFF',
				size: 36,
				autoFontSize: false,
				autoSize: false
			},
			layoutWidth: '90%',
			layoutHeight: '15%',
			centerX: true,
			on : {
				up: callback
			}
		});
	}
	
	this.launchUI = function () {};

	// event handlers 
	function connect () {
		// create a socket object:
		var host = IP_ADDRESS;
		var port = 8338;

		var logArea = this.logArea;
		logArea.setText('Connecting to ' + IP_ADDRESS + ':' + port + '\n');

		import gc.native.socketTransport;
		var Socket = gc.native.socketTransport.Socket;
		// creating a socket object will attempt to connect automatically
		this._socket = new Socket(host, port);
		// define dummy event handlers that just update the UI:
		this._socket.onError = function () { logArea.setText(logArea.getText() + 'Error ... :/\n') }
		this._socket.onClose = function () { logArea.setText(logArea.getText() + 'Socket closed\n') }
		this._socket.onConnect = function () { logArea.setText(logArea.getText() + 'Socket Connected to ' + IP_ADDRESS + ':' + port + '!\n') }
		this._socket.onRead = function (data) { logArea.setText(logArea.getText() + 'Socket received Data!\n' + data) }
	}

	function send () {
		console.log('send button tapped');
		this._socket.send('This should work, no?');
	}

	function disconnect () {
		console.log('disconnect button pressed');
		this._socket.close();
	}

});
