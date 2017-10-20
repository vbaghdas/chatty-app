import types from './types';
import axios from 'axios';

export function signup(userInfo){
    return dispatch => {
        axios.post('/auth/signup', userInfo).then(resp => {
            console.log('Resp from server:', resp);
            localStorage.setItem('token', resp.data.token);

            dispatch({
                type: types.SIGNUP,
                payload: resp.data
            })
        });
    }
}

export function login(userInfo){
    return dispatch => {
        axios.post('/auth/login', userInfo).then ( resp => {
            console.log('Login Resp', resp);
            localStorage.setItem('token', resp.data.token);

            dispatch({
                type: types.LOGIN,
                payload: resp.data
            })
        })
    }
}

export function jwtLogin(){
    return dispatch => {
        axios.get('/auth/get-user', {headers: { authorization: localStorage.getItem('token') }}).then(resp => {
            dispatch({
                type: types.LOGIN,
                payload: resp.data
            });
        });
    }
}

export function logout(){
    localStorage.removeItem('token');

    return {
        type: types.LOGOUT
    }
}