import types from '../actions/types';

const DEFAULT_STATE = { auth: null};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.LOGIN:
        case types.SIGNUP:
            return { auth: { 
                username: action.payload.username,
                color: action.payload.color 
            }}
        case types.LOGOUT:
            return { auth: null }
        default:
            return state;
    }
}