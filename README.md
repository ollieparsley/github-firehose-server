#Github Firehose Server

Using the github-firehose-node code to create an HTTP and WebSocket server for using the github firehose

##Requirements

* Node.JS

##Dependencies (defined in package.json)

* github-firehose
* websocket.io

##Nodester out of the box

The repo is all set and ready for use on nodester (http://nodester.com) as it makes use of the app_port environment variable for binding to a port for the http server. WebSockets bind to port 80.