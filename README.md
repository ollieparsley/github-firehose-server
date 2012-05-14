#Github Firehose Server

Using the github-firehose-node code to create an HTTP and WebSocket server for using the github firehose

##Requirements

* Node.JS

##Dependencies (defined in package.json)

* github-firehose
* websocket.io

##Usage

*Clone the repo
*`npm install`
*`npm start`

You will undoubtedly need to change the ports used to bind. I've built this for nodester which has separate ports for HTTP and WebSockets. You might need to make tweaks for your own ports.

##Nodester out of the box

The repo is all set and ready for use on nodester (http://nodester.com) as it makes use of the app_port environment variable for binding to a port for the http server. WebSockets bind to port 80.