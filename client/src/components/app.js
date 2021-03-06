import 'materialize-css/dist/css/materialize.min.css'; 
import './app.css';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { jwtLogin } from '../actions';
import Home from './home';
import Signup from './signup';
import Login from './login';
import Nav from './nav';
import ChatLobby from './chat_lobby';
import ChatRoom from './chat_room';


class App extends Component {
    componentWillMount(){
        if(localStorage.token){
            this.props.jwtLogin();
        }
    }

    render(){
        return (
        <div className="container">
            <Nav/>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/chat-lobby" component={ChatLobby}/>
            <Route path="/chat/:id" component={ChatRoom}/>
        </div>
        )
    }
}

export default withRouter(connect(null, { jwtLogin })(App));