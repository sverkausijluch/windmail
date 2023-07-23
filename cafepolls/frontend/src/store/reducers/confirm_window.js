import SET_CONFIRM_WINDOW from '../actions/setconfirmwindow.js'
import initialState from '../initialState.js'


export default function confirm_window(state=initialState.confirm_window, action) {
    switch(action.type) {
        case SET_CONFIRM_WINDOW: return state = action.value
        default: return state;
    }
}
