import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoomList } from '../actions';

class Chat extends Component {
    constructor(props){
        super(props);

        // this.socket = openSocket('http://localhost:3500');

        // this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount(){
            // this.socket.on('chat message', msg => {
            //     console.log('Message Received:', msg)
            // });

            this.props.getRoomList();
    }

    sendMessage(){
        this.socket.emit('chat message', 'Hello hard coded');
    }

    render(){
        console.log('This is rooms:', this.props.rooms)

        const roomList = this.props.rooms.map((room, index) => {
            return (
                <li key={index} className="collection-item avatar grey darken-4">
                    <i className="circle teal"></i>
                    <Link to={`/chat/${room._id}`}>{room.name}</Link>
                </li>
            )
        })

        return (
            <div>
                <h1>Chat Lobby</h1>
                <ul className="collection">
                    {roomList}
                </ul>
                {/* <button onClick={this.sendMessage} className="btn">Send Message</button> */}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        rooms: state.chat.rooms
    }
}

export default connect(mapStateToProps, { getRoomList })(Chat);