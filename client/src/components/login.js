import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderInput } from '../helpers';
import { login } from '../actions';

class Login extends Component {

    constructor(props){
        super(props);
    }

    // componentWillReceiveProps(){
    //     this.props.history.push("/chat-lobby");
    // }

    handleLogin(vals){
            console.log('Sign In Vals:', vals);
            this.props.login(vals);
    }

    render(){
        const { handleSubmit } =  this.props;
        return (
            <form onSubmit={handleSubmit((vals) => this.handleLogin(vals))}>
                <Field name="email" label="Email" type="email" component={renderInput}/>
                <Field name="password" label="Password" type="password" component={renderInput}/>
                <button className="btn btn-large">Login</button>
            </form>
        )
    }

}

Login = reduxForm({
    form: 'login'
})(Login)

export default connect(null, {login})(Login)