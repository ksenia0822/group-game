'use strict';

var express = require('express');
var app = express();
var path = require("path")

var indexPath = path.join(__dirname, '..', 'browser', 'index.html');

app.get('/', function(req, res) {
	res.sendFile(indexPath)
})

app.listen(3000, function() {
	console.log("Set app listening on port 3000")
})