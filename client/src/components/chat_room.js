import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';

class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.socket = openSocket('http://localhost:3500');
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            msg: '',
            allMsgs: [],
        }
    }

    componentDidMount(){
        this.socket.on('connect', () => {
            this.socket.emit('room', this.props.match.params.id);
        });
        this.socket.on('message', msg => {
            console.log('Message Received:', msg)
            this.setState({
                allMsgs: [msg, ...this.state.allMsgs]
            })
        });
    }

    componentWillUnMount(){
        console.log('Unmounting Chat Room');
        this.socket.emit('leave room', this.props.params.match.params.id)
    }

    handleChange(e){
        this.setState ({
            msg: e.target.value
        })
    }

    sendMessage(e){
        e.preventDefault();
        
        const { username, color } = this.props.user;
        const { msg } = this.state;
        this.socket.emit('message', username + ': ' + msg);
        
        this.setState({
            msg: ''
        })
    }

    render(){
        console.log('Chat Lobby Props', this.props);
        const { msg, allMsgs } = this.state;

        const msgList = allMsgs.map((msg, index) => {
            return <li style={{color: this.props.user.color}} key={index}>{msg}</li>
        })
        return (
            <div>
                <h4>Welcome to {this.props.match.params.id}</h4>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s8">
                                    <input id="msg" type="text" value={msg} onChange={this.handleChange}/>
                                    <label className="active">Message</label>
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light" onClick={this.sendMessage}>SEND</button>
                        </form>
                    </div>
                <ul>
                    {msgList}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user.auth
    }
}

export default connect(mapStateToProps)(ChatRoom);