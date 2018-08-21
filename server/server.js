const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
  console.log('New users connected');

  socket.emit('newMessage', generateMessage('Admin','Welcome to our chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

  socket.on('createMessage', (message, callback)=>{
    console.log(`New message from ${message.from}`, message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', ()=>{
    console.log('User was disconnect');
  });
});

app.use(express.static(publicPath));

server.listen(port, ()=>{
  console.log("Server started on port 3000");
});

app.get('/', (req, res)=>{
  res.status(200).send('Up and running');
});

console.log(__dirname + '/../public');
console.log(publicPath);
