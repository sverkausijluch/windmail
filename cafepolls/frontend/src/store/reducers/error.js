import SET_ERROR from '../actions/seterror.js'
import initialState from '../initialState.js'


export default function error(state=initialState.error, action) {
    switch(action.type) {
        case SET_ERROR: return state = action.value
        default: return state;
    }
}
