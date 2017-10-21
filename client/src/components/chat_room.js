import React, { Component } from 'react';
import openSocket from 'socket.io-client';

class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.socket = openSocket('http://localhost:3500');
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(){
        this.socket.emit('message', 'Hello hard coded');
    }

    componentDidMount(){
        this.socket.on('connect', () => {
            this.socket.emit('room', this.props.match.params.id);
        });
        this.socket.on('message', msg => {
            console.log('Message Received:', msg)
        });
    }

    componentWillUnMount(){
        console.log('Unmounting Chat Room');

        this.socket.emit('leave room', this.props.params.match.params.id)
    }

    render(){
        return (
            <div>
                <h1>Welcome to room {this.props.match.params.id}</h1>
                <button onClick={this.sendMessage} className="btn teal">Send Message</button>
            </div>
        )
    }
}

export default ChatRoom;