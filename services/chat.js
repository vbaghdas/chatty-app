const io = require ('socket.io')();

io.on('connection', client => {
    client.on('room', room => {
        client.join(room);
        io.sockets.in(room).emit('message');

        client.on('message', msg => {
            io.in(room).emit('message', msg);
        })
    });
    client.on('leave room', (room) => {
        console.log('Client Left'); 
        client.leave(room)
    })
});

io.listen(3500)

console.log('Chat Server Running On PORT: 3500');