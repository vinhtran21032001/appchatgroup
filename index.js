const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const socketHandler = require('./public/js/server')
app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/resource/views/index.html')
})

io.on('connection' ,(socket) => {
    socketHandler(socket,io)


})

server.listen(process.env.PORT || 3000, function() {
    console.log('Listening port 3000');
})
