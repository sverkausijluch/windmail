import SET_POLL_EDITED from '../actions/setpolledited.js'
import initialState from '../initialState.js'


export default function poll_edited(state=initialState.poll_edited, action) {
    switch(action.type) {
        case SET_POLL_EDITED: return state = action.value
        default: return state;
    }
}
