const app = require('express')(),
server = require('http').createServer(app),
bodyParser = require('body-parser'),
ejs = require('ejs'),
sequelize = require('sequelize')

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);
