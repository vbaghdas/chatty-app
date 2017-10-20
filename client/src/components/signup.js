import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signup } from '../actions';
import { renderInput } from '../helpers';

class Signup extends Component {

    renderColorPicker({ input, label, color }){

        const inputStyle = { width: '100%' };
        const labelStyle = { position: 'relative' };

        return (
            <div className="input-field col s12">
                <input {...input} type='color' style={inputStyle} />
                <label htmlFor={input.name} style={labelStyle}> {label} </label>
            </div>
        )
    }

    onSubmit(vals){
        console.log('Form Vals:', vals);

        this.props.signup(vals);
    }

    render(){

        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit((vals) => this.onSubmit(vals))} >
                <Field name="firstName" label="First Name" type="text" component={renderInput}/>
                <Field name="lastName" label="Last Name" type="text" component={renderInput}/>
                <Field name="username" label="User Name" type="text" component={renderInput}/>
                <Field name="email" label="Email" type="email" component={renderInput}/>
                <Field name="password" label="Password" type="password" component={renderInput}/>
                <Field name="confirmPassword" label="Confirm Password" type="password" component={renderInput}/>
                <Field name="color" label="Favorite Color" component={this.renderColorPicker}/>
                <button style={{ marginTop: '10px' }} className="btn btn-large">Signup</button>
            </form>
        )
    }
}

function validate(vals){
    const errors = {};

    if(!vals.firstName){
        errors.firstName = 'Please enter your first name';
    }
    if(!vals.lastName){
        errors.lastName = 'Please enter your last name';
    }
    if(!vals.username){
        errors.username = 'Please enter a user name';
    }
    if(!vals.email){
        errors.email = 'Please enter your email';
    }
    if(!vals.password){
        errors.password = 'Please enter a password';
    }
    if(vals.password !== vals.confirmPassword){
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
}

Signup = reduxForm({
    form: 'signup',
    validate,
    initialValues: {
        color: '#26a69a'
    }
})(Signup);

export default connect(null, {signup})(Signup);