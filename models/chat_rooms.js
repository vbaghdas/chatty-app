const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
    name: String,
    chatLog: Array
});

const ModelClass = mongoose.model('chatroom', chatRoomSchema);

module.exports = ModelClass;