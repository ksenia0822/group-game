'use strict';

var express = require('express');
var app = express();
var path = require("path")
// var socketio = require("socket.io")

var indexPath = path.join(__dirname, '..', 'index.html');
var rootPath = path.join(__dirname, '..');


app.use(express.static('public'))
app.use(express.static(rootPath));

app.get('/', function(req, res) {
	res.sendFile(indexPath)
})



// var io = socketio(server);

app.listen(process.env.PORT || 3000, function() {
	console.log("Set app listening on port 3000")
})