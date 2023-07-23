import SET_IS_NEW_NOTIFS from '../actions/setisnewnotifs.js'
import initialState from '../initialState.js'


export default function is_new_notifs(state=initialState.is_new_notifs, action) {
    switch(action.type) {
        case SET_IS_NEW_NOTIFS: return state = action.value
        default: return state;
    }
}
