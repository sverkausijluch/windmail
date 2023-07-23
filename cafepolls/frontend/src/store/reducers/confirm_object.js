import SET_CONFIRM_OBJECT from '../actions/setconfirmobject.js'
import initialState from '../initialState.js'


export default function confirm_object(state=initialState.confirm_object, action) {
    switch(action.type) {
        case SET_CONFIRM_OBJECT: return state = action.value
        default: return state;
    }
}
