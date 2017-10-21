import types from '../actions/types';

const DEFAULT_STATE = { rooms: [] };

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_ROOM_LIST:
            return { rooms: action.payload }
        default:
            return state;
    }
}