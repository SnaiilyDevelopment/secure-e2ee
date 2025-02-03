const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from the current directory
app.use(express.static(__dirname));

// Setup Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Listen for chat messages from a client
  socket.on('chat message', (data) => {
    // Broadcast the message to all clients
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); 