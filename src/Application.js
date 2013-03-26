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

exports = Class(GC.Application, function () {

	this.initUI = function () {
		var menuView = new View({
			superview: this.view,
			layoutWidth: '100%',
			layoutHeight: '100%',
			layout: 'linear',
			direction: 'vertical',
			justifyContent: 'space-outside'
		});

		var connectBtn = new ButtonView({
			superview: menuView,
			title: 'Connect',
			backgroundColor: '#666666',
			text: {
				color: '#FFFFFF',
				size: 32,
				autoFontSize: false,
				autoSize: false
			},
			layoutWidth: '80%',
			layoutHeight: '25%',
			centerX: true,
			// event handling
			on : {
				up: connect.bind(this)
			}
		});

		var sendBtn = new ButtonView({
			superview: menuView,
			title: 'Send Data',
			backgroundColor: '#888888',
			text: {
				color: '#FFFFFF',
				size: 32,
				autoFontSize: false,
				autoSize: false
			},
			layoutWidth: '80%',
			layoutHeight: '25%',
			centerX: true,
			on : {
				up: send.bind(this)
			}
		});

		var disconnectBtn = new ButtonView({
			superview: menuView,
			title: 'Disconnect',
			backgroundColor: '#AAAAAA',
			text: {
				color: '#FFFFFF',
				size: 32,
				autoFontSize: false,
				autoSize: false
			},
			layoutWidth: '80%',
			layoutHeight: '25%',
			centerX: true,
			on : {
				up: disconnect.bind(this)
			}
		});

	};
	
	this.launchUI = function () {};

	// event handlers 

	function connect () {
		console.log('Connect button tapped');

		// create a socket object:
		var host = '10.10.13.41';
		var port = 7878;

		import gc.native.socketTransport;
		var Socket = gc.native.socketTransport.Socket;
		// creating a socket object will attempt to connect automatically
		this._socket = new Socket(host, port);
		// define dummy event handlers:
		this._socket.onError = function () { console.log('Error ... :/')}
		this._socket.onClose = function () { console.log('Socket closed') }
		this._socket.onConnect = function () { console.log('Socket Connected!!') }
		this._socket.onRead = function (data) { console.log('Socket received Data!!! --> ' + data) }
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
