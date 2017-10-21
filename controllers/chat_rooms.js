const ChatRoom = require('../models/chat_rooms.js');

exports.listRooms = function(req, res){
    const query = ChatRoom.find({}).select('name');

    query.exec(function (err, rooms){
        
        console.log('Rooms', rooms);
        res.send(rooms);
    })
}

exports.addRoom = function(req, res){
    const room = new ChatRoom({
        name: req.query.name,
        chatLog: []
    });

    room.save().then( err => {
        res.send(`New room created named: ${req.query.name}`);
    });
}