var http = require('http');
var ws = require('websocket.io');
var Firehose = require('github-firehose');

//Creat a client array
var clients = {};

//Start
console.log("Starting Github firehose server");

//Create HTTP server
var httpServer = http.createServer();
httpServer.listen(process.env['app_port'] !== undefined ? process.env['app_port'] : 8001);

//Create WebSocket server
var webSocketServer = ws.listen(process.env['app_port_websocket'] !== undefined ? process.env['app_port_websocket'] : 80);

//Listening
console.log("Github firehose server started and listening");

//Receive a connect on http
httpServer.on('request', function(request, response) {
	var id = Math.random().toString().substr(2) + '_http';
	clients[id] = {
		id: id,
		type: 'http',
		request: request,
		response: response,
		start: new Date()
	};
	
	console.log('Client (' + id + ') connected');
	
	//When socket is closed
	response.on('close', function(){
		delete clients[id];
		console.log('Client (' + id + ') disconnected');
	});
	request.on('close', function(){
		delete clients[id];
		console.log('Client (' + id + ') disconnected');
	});
	
	//Write headers
	response.writeHead(200);
	
});

//Receive a connect on websocket
webSocketServer.on('connection', function (socket) {
	var id = Math.random().toString().substr(2) + '_ws';
	clients[id] = {
		id: id,
		type: 'ws',
		socket: socket,
		start: new Date()
	};
	
	console.log('Client (' + id + ') connected');
	
	//When socket is closed
	socket.on('close', function(){
		delete clients[id];
		console.log('Client (' + id + ') disconnected');
	});
});


//Create a new instance
var firehose = new Firehose();

//Add error handler
firehose.on('error', function(e) {
	console.log('ERROR: ' . e.stack);
});

//Add event handler
firehose.on('event', function(event) {
	//Loop through each client and send
	Object.keys(clients).forEach(function(id){
		var client = clients[id];
		if (client.type == 'http') {
			client.response.write(JSON.stringify(event) + "\r\n");
			
		} else if (client.type == 'ws') {
			client.socket.send(JSON.stringify(event));
		}
		
	});
});

//Start consuming
firehose.start();
